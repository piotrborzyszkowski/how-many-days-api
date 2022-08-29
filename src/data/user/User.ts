export class User {
    constructor(
        public id: string | undefined,
        public authenticationId: string,
        public email: string,
    ) {
    }
}
