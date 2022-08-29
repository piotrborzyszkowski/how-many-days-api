import {RepeatInterval} from "./RepeatInterval";

export class Event {
    constructor(
        public id: string | undefined,
        public name: string,
        public userId: string,
        public date: Date,
        public repeatEvery: RepeatInterval,
        public remindDaysBefore?: number[],
    ) {
    }
}
