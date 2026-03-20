import { Router, RequestHandler  } from "express";
import {
  getPropertyListings,
  getPropertyListingById,
} from "src/controllers/propertyListings";

const router = Router();

router.get("/", getPropertyListings as RequestHandler);
router.get("/:id", getPropertyListingById as RequestHandler);

export default router;
