export type KeyValuePair = {
    [key: string]: any;
}
export interface Icon {
    id: string;
    url: string;
}
export interface FieldValue {
    id: string;
    value: string;
    icon: Icon;
}
export interface Field {
    dataTypes: string;
    fieldType: string;
    id: string;
    isActive: number;
    isRequired: boolean;
    label: string;
    sortOrder?: string;
    values: FieldValue[];
}
export interface SubCategory {
    id: string;
    name: string;
    description: string;
    fields: Field[];
    isActive: number;
    isPopular: number;
}

export interface CategoryIcon {
    extension: string;
    id: string;
    mime: string;
    url: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    fields: Field[];
    isActive: number;
    isPopular: number;
    subCategories: SubCategory[];
    icon: CategoryIcon;
}