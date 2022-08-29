import {MongoEvent} from "./MongoEvent";
import {Event} from "./Event";

export const mapEventToMongo = (event: Event): MongoEvent => {
    return {
        _id: event.id,
        userId: event.userId,
        name: event.name,
        date: event.date,
        repeatEvery: event.repeatEvery,
        remindDaysBefore: [...(event.remindDaysBefore || [])],
    }
};
