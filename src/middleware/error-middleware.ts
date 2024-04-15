import { ErrorRequestHandler } from "express";

export const errorHandlerMiddleWare: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  console.error("uncaught exception", error);
  return res
    .status(500)
    .send("An unexpected error has occurred, please try again.");
};
