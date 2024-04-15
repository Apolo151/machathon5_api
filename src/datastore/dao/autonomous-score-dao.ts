import { AutonomousSubmission } from "../../types";

export interface AutonomousSubmissionDao {
    createSubmission(teamSubmission: AutonomousSubmission): void;
    getTeamSubmissions(teamCode: string): AutonomousSubmission[];
    getTopScores(): AutonomousSubmission[];
}