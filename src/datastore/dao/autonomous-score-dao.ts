import { AutonomousSubmission } from "../../types";

export interface AutonomousSubmissionDao {
    createSubmission(teamSubmission: AutonomousSubmission): Promise<void>;
    getTeamSubmissions(teamCode: string): Promise<AutonomousSubmission[]>;
    getTopScores(): Promise<AutonomousSubmission[]>;
}