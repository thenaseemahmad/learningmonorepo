import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/auth/signout",(req:Request, res:Response)=>{
    res.status(201).send("<h1>Hello world from /api/auth/signout</h1>")
})

export {router as singoutRouter};