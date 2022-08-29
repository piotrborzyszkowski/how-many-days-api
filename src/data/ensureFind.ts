export async function ensureFindSingle<EntityType>(func: (id:string) => Promise<EntityType | null>, id: string): Promise<EntityType> {
    const result = await func(id);
    if (!result) {
        const error = `Unable to find entity with id ${id}`;
        console.log(error);
        throw new Error(error);
    }

    return result!;
}
