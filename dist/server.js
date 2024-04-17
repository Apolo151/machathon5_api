"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const index_1 = require("./index");
require("dotenv").config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, index_1.createServer)(process.env.DATABASE_URL); // Specify the type of app as Express
    // Run server on server port
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Listening on port ${process.env.SERVER_PORT}`);
    });
});
exports.startServer = startServer;
(0, exports.startServer)();
