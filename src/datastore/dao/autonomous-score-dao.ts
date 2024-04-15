import {
  AutonomousScore,
  AutonomousSubmission,
  CompetitionTeam,
} from "../../types";

export interface AutonomousSubmissionDao {
  createSubmission(teamSubmission: AutonomousSubmission): Promise<void>;
  getAllSubmissions(): Promise<AutonomousSubmission[]>;
  getTeamSubmissions(teamCode: string): Promise<AutonomousSubmission[]>;
  getTopScores(): Promise<AutonomousScore[]>;
}
