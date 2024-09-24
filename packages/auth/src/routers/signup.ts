import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import UserExistError from "../errors/userExistError";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { natsClient } from "../events/nats-client";
import { NewUserCreatedEventPublisher } from "../events/new-user-created-event";



const router = express.Router();
router.post("/api/auth/signup", [body("fName").notEmpty().withMessage("Full name can't be empty"),
body("email").isEmail().withMessage("Invalid email supplied"),
body("password").isStrongPassword().withMessage("Supplied password is not strong")
], async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    try {
        if (!validationErrors.isEmpty()) {
            throw new RequestValidationError(validationErrors.array());
        }
    }
    catch (error) {
        next(error);
        return
    }

    //Check if this user exist
    const { fName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    try {
        if (existingUser) {
            throw new UserExistError("User already registered")
        }
    } catch (error) {
        next(error);
        return
    }

    const thisUser = new User({ fName, email, password });
    await thisUser.save();
    const { _id } = thisUser;

    //Publish event for this newly registered user
    await new NewUserCreatedEventPublisher(natsClient.client).publish({
        id: _id.toString(), fName: fName, email: email
    })
    const token = jwt.sign({
        id: _id,
        fName,
        email
    }, "jwtsecret");
    req.session = { jwt: token };
    res.status(201).send({ User: { id: _id, fName, email } })
})

export { router as signupRouter }