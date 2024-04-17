"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAttendeeDataMiddleware = void 0;
const { body } = require("express-validator");
const isYearValid = (year) => {
    if (year > 2033 || year < 1990) {
        return false;
    }
    return true;
};
const validateAttendeeDataMiddleware = (req, _, next) => {
    body("email").isEmail().normalizeEmail(),
        body("national_id").isLength({
            min: 14,
            max: 14,
        }),
        body("national_id").isInt(),
        body("name").isString(),
        body("phone_number").matches(/^01[0-2,5]\d{8}$/),
        body("university").isString(),
        body("faculty").isString(),
        isYearValid(body("grad_year")),
        next();
};
exports.validateAttendeeDataMiddleware = validateAttendeeDataMiddleware;
