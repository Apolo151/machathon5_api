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
exports.AutonomousCompetitionController = void 0;
class AutonomousCompetitionController {
    constructor(db) {
        this.getAllAutonomousTeams = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.db.getAllTeams();
            res.status(200).json({ teams });
        });
        this.insertTeam = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { team_name, team_code } = req.body.team;
            const team = {
                teamName: team_name,
                teamCode: team_code,
                registeredAt: Date.now(),
            };
            yield this.db.createTeam(team);
            return res.sendStatus(200);
        });
        this.getAllSubmissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const submissions = yield this.db.getAllSubmissions();
            res.status(200).json({ submissions });
        });
        this.getTeamSubmissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { team_code } = req.params;
            const submissions = yield this.db.getTeamSubmissions(team_code);
            res.status(200).json({ submissions });
        });
        this.insertSubmission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { team_code, first_laptime, second_laptime } = req.body;
            const submission = {
                teamCode: team_code,
                firstLaptime: first_laptime,
                secondLaptime: second_laptime,
                totalLaptime: first_laptime + second_laptime,
                submissionTime: Date.now(),
            };
            yield this.db.createSubmission(submission);
            return res.sendStatus(200);
        });
        this.getTopScores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const scores = yield this.db.getTopScores();
            res.status(200).json({ scores });
        });
        this.db = db;
    }
}
exports.AutonomousCompetitionController = AutonomousCompetitionController;
