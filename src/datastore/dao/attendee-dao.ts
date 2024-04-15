import { Attendee } from "../../types";

export interface AttendeeDao {
    createAttendee(attendee: Attendee): void;
    getAllAttendees(): Attendee[];
    getAttendeeByEmail(email: string): Attendee | undefined;
    getTeamByNid(nationalID: number): Attendee | undefined;
}