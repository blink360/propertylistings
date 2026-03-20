import { Response, NextFunction } from "express";
import { AuthRequest } from "./index.d";

const roleMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const role = req.headers["x-role"];
  req.is_admin = role === "admin";
  next();
};

export { roleMiddleware };
