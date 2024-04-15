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
  registeredAt: number;
}

export interface AutonomousSubmission {
  teamCode: string;
  firstLaptime: number;
  secondLaptime: number;
  totalLaptime: number;
  submissionTime: number;
}

export interface AutonomousScore {
  teamName: string;
  totalLaptime: number;
}
