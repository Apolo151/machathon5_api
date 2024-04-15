import { AutonomousSubmission } from "../types";

export interface AutonomousSubmissionDao {
    createSubmission(team: AutonomousSubmission): void;
    getTeamSubmissions(teamCode: string): AutonomousSubmission[];
    getTopScores(): AutonomousSubmission[];
}