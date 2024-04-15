import { CompetitionTeam } from "../types";

export interface CompetitionTeamDao {
    createTeam(team: CompetitionTeam): void;
    getTeamByEmail(email: string): CompetitionTeam | undefined;
    getTeamByNid(nationalID: number): CompetitionTeam | undefined;
    getTeams(): CompetitionTeam[];
}