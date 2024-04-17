"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleWare = void 0;
const errorHandlerMiddleWare = (error, req, res, next) => {
    console.error("uncaught exception", error);
    return res
        .status(500)
        .send("An unexpected error has occurred, please try again.");
};
exports.errorHandlerMiddleWare = errorHandlerMiddleWare;
