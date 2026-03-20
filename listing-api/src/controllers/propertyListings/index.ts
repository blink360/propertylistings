import { NextFunction, Response } from "express";
import { AuthRequest } from "src/middlewares/role/index.d";
import { IListingFilters } from "src/services/propertyListings/index.d";
import { getAllListings, getListingById } from "src/services/propertyListings";

const getPropertyListings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const isAdmin = req.is_admin;

  const filters: IListingFilters = {
    price_min: req.query.price_min ? Number(req.query.price_min) : undefined,
    price_max: req.query.price_max ? Number(req.query.price_max) : undefined,
    beds: req.query.beds ? Number(req.query.beds) : undefined,
    baths: req.query.baths ? Number(req.query.baths) : undefined,
    property_type: req.query.property_type
      ? String(req.query.property_type)
      : undefined,
    suburb: req.query.suburb ? String(req.query.suburb) : undefined,
    keyword: req.query.keyword ? String(req.query.keyword) : undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  try {
    const listings = await getAllListings(filters, isAdmin);
    res.json({ data: listings });
  } catch (error) {
    next(error);
  }
};

const getPropertyListingById = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction,
) => {
  const id = parseInt(String(request.params.id));
  const is_admin = request.is_admin;

  if (isNaN(id) || !id)
    return response.status(400).json({ error: "Invalid ID." });

  try {
    const listing = await getListingById(id, is_admin);

    if (!listing) {
      response.status(404).json({ error: "Listing not found" });
      return;
    }

    response.json({ data: listing });
  } catch (error) {
    next(error);
  }
};

export { getPropertyListings, getPropertyListingById };
