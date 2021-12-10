export interface Icon {
  id: string;
  url: string;
}
export interface FieldValues {
  id: string;
  value: string;
  icon: Icon;
}
export interface Fields {
  dataTypes: string;
  fieldType: string;
  id: string;
  isActive: number;
  isRequired: boolean;
  label: string;
  sortOrder?: string;
  values: FieldValues[];
}
export interface Categories {
  id: string;
  name: string;
  description: string;
  fields: Fields[];
  isActive: number;
  isPopular: number;
}
export interface SubCategories {
  id: string;
  name: string;
  description: string;
  fields: Fields[];
  isActive: number;
  isPopular: number;
}
