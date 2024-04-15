import { Attendee } from "../../types";

export interface AttendeeDao {
    createAttendee(attendee: Attendee): Promise<void>;
    getAllAttendees(): Promise<Attendee[]>;
    getAttendeeByEmail(email: string): Promise<Attendee | undefined>;
    getTeamByNid(nationalID: number): Promise<Attendee | undefined>;
}