import {Model} from "mongoose";

export async function ensureFindSingle<EntityType>(func: (id:string, mongooseModel: Model<EntityType>) => Promise<EntityType | null>, mongooseModel: Model<EntityType>, id: string): Promise<EntityType> {
    const result = await func(id, mongooseModel);
    if (!result) {
        const error = `Unable to find entity with id ${id}`;
        console.log(error);
        throw new Error(error);
    }

    return result!;
}
