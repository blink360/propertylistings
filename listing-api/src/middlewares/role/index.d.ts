import { Request } from "express";

export interface AuthRequest extends Request {
    is_admin?: boolean;
}
