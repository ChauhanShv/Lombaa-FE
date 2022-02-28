export interface SearchFieldValue {
  id: string;
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