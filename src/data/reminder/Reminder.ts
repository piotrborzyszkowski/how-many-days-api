export class Reminder {
    constructor(
        public id: string | undefined,
        public date: Date,
        public eventId: string,
        public fired: boolean,
        public daysBefore: number,
    ) {
    }
}