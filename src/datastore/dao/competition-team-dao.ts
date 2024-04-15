import { CompetitionTeam } from "../../types";

export interface CompetitionTeamDao {
    createTeam(team: CompetitionTeam): void;
    getAllTeams(): CompetitionTeam[];
}