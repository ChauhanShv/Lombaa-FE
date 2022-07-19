export interface SearchFieldValue {
  id: string;
  approvedAt: string;
  category: {
    id: string;
    name: string;
  };
  categoryId: string;
  deletedAt: string;
  description: string;
  expiry: string;
  location: any;
  locationId: string;
  postedAt: string;
  price: string;
  productFields: any;
  productMedia: any;
  rejectReason?: string;
  rejectedAt?: string;
  slug: string;
  soldAt?: string;
  title: string;
  user: {
    name: string;
    profilePicture: any;
    profilePictureId: string;
  }
  userId: string;
  name: string;
}
export interface LocationData {
  regionId: string;
  cityId: string;
  cityName: string;
  regionName: string;
  coordinate: string;
  label: string;
}
export interface LocationSelectorProps {
  onCitySelected?: (data: object) => void;
}
export interface Notification {
  createdAt: string,
  deletedAt: string,
  description: string,
  id: string,
  path: string,
  seenAt: string,
  text: string,
  type: string,
  updatedAt: string,
  
}