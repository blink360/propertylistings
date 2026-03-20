import { IListingFilters, IProperty } from "src/services/propertyListings/index.d";
import { applyListingFilters } from "src/utils/filters";
import Property from "src/db/models/Property";
import Agent from "src/db/models/Agent";

const getAllListings = async (filters: IListingFilters, isAdmin = false) => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const offset = (page - 1) * limit;

  const allProperties = await Property.findAll({
    include: [{ model: Agent, as: "agent" }],
    raw: true,
    nest: true,
  }) as unknown as IProperty[];

  const filtered = applyListingFilters(allProperties, filters);
  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  const data = paginated.map(({ internal_notes, ...rest }) =>
    isAdmin ? { ...rest, internal_notes } : rest
  );

  return {
    data,
    meta: {
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    },
  };
};

const getListingById = async (
  id: number,
  isAdmin = false,
): Promise<Omit<IProperty, "internal_notes"> | IProperty | undefined> => {
  const listing = await Property.findByPk(id, {
    include: [{ model: Agent, as: "agent" }],
    raw: true,
    nest: true,
  }) as unknown as IProperty;

  if (!listing) return undefined;

  if (!isAdmin) {
    const { internal_notes, ...rest } = listing;
    return rest;
  }

  return listing;
};

export { getAllListings, getListingById };