export interface IProperty {
  id: number;
  agent_id: number;
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  property_type: string;
  suburb: string;
  address: string;
  status: string;
  internal_notes: string;
  created_at: string;
}

export interface IListingFilters {
  price_min?: number;
  price_max?: number;
  beds?: number;
  baths?: number;
  property_type?: string;
  suburb?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}