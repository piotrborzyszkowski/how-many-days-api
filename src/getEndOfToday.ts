import {Newable} from "./Newable";

export function getEndOfToday(dateClass: Newable<Date>) {
    const today = new dateClass();
    today.setHours(23, 59, 59, 999);
    return today;
}
