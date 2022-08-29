import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

export async function authorize(event: any) {
    const key = jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
}