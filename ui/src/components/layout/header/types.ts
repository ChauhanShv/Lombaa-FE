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
