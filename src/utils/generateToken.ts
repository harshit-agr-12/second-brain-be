import jwt from "jsonwebtoken"
import { config } from "../config/env"

export function generate(payload: object): string {
    const jwtSecret = config.jwtSecret as string;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
    return token;
}