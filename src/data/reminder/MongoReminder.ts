export interface MongoReminder {
    _id?: string,
    date: Date,
    eventId: string,
    fired: boolean,
    daysBefore: number,
}