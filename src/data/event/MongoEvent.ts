import {RepeatInterval} from "./RepeatInterval";

export interface MongoEvent {
    _id?: string,
    userId: string,
    name: string,
    date: Date,
    repeatEvery: RepeatInterval,
    remindDaysBefore?: number[],
}
