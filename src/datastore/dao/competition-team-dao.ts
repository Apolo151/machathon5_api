import { CompetitionTeam } from "../../types";

export interface CompetitionTeamDao {
    createTeam(team: CompetitionTeam): Promise<void>;
    getAllTeams(): Promise<CompetitionTeam[]>;
}