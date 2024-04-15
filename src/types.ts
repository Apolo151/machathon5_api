export interface Attendee {
  fullName: string;
  phoneNumber: string;
  email: string;
  nationalID: number;
  university: string;
  facutly: string;
  graduationYear: number;
  registeredAt: number;
}

export interface CompetitionTeam {
  teamName: string;
  teamCode: string;
}

export interface AutonomousSubmission {
  teamCode: string;
  firstLaptime: number;
  secondLaptime: number;
}
