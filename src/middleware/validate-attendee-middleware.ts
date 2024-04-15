import { RequestHandler } from "express";

const isYearValid = (year: number): boolean => {
  if (year > 2033 || year < 1990) {
    return false;
  }
  return true;
};

export const validateAttendeeDataMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  req.body("email").isEmail().normalizeEmail(),
    req.body("national_id").isLength({
      min: 14,
      max: 14,
    }),
    req.body("national_id").isInt(),
    req.body("name").isString(),
    req.body("phone_number").matches(/^01[0-2,5]\d{8}$/),
    req.body("university").isString(),
    req.body("faculty").isString(),
    isYearValid(req.body("grad_year")),
    next();
};
