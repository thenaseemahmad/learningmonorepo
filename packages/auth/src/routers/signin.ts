import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/auth/signin",(req:Request, res:Response)=>{
    res.status(200).send("<h1>Hello world from /api/auth/signin</h1>")
});

export {router as singinRouter};