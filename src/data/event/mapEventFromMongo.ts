import {MongoEvent} from "./MongoEvent";
import {Event} from "./Event";

export const mapEventFromMongo = (mongoEvent: MongoEvent | null): Event | null =>
    mongoEvent == null ? null :
        new Event(
            mongoEvent._id ? `${mongoEvent._id}` : undefined,
            mongoEvent.name,
            mongoEvent.userId,
            mongoEvent.date,
            mongoEvent.repeatEvery,
            mongoEvent.remindDaysBefore ? [...mongoEvent.remindDaysBefore] : undefined,
        );
