import { IProperty,  IListingFilters } from "src/services/propertyListings/index.d";

export const applyListingFilters = (
  properties: IProperty[],
  filters: IListingFilters,
): IProperty[] => {
  return properties
    .filter((p) => filters.price_min === undefined || p.price >= filters.price_min)
    .filter((p) => filters.price_max === undefined || p.price <= filters.price_max)
    .filter((p) => filters.beds === undefined || p.beds === filters.beds)
    .filter((p) => filters.baths === undefined || p.baths === filters.baths)
    .filter((p) => !filters.property_type || p.property_type === filters.property_type)
    .filter((p) => !filters.suburb || p.suburb.toLowerCase() === filters.suburb.toLowerCase())
    .filter((p) => {
      if (!filters.keyword) return true;
      const kw = filters.keyword.toLowerCase();
      return (
        p.title.toLowerCase().includes(kw) ||
        p.description.toLowerCase().includes(kw) ||
        p.address.toLowerCase().includes(kw)
      );
    });
};