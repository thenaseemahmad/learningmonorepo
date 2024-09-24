import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/auth/currentuser",(req:Request, res:Response)=>{
    res.status(200).send("<h1>Hello world from /api/auth/currentuser</h1>")
});

export {router as currentuserRouter};