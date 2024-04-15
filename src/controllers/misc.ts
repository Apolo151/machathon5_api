import { RequestHandler } from "express";

export const checkServer: RequestHandler = (req, res) => {
  console.log("Are you awake?");
  res.status(200).json({
    state: "success",
    msg: "I am awake",
  });
};
