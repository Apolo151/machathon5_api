"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServer = void 0;
const checkServer = (req, res) => {
    res.status(200).json({
        state: "success",
        msg: "I am awake",
    });
};
exports.checkServer = checkServer;
