export function ensure(value: any, name: string): void {
    if (!value) {
        const msg = `Expecting value for ${name}`;

        console.log(msg);
        throw msg;
    }
}