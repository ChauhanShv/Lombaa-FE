import { ProductDetail } from "../product-detail/types";

export interface DragAndDropProps {
    updateMedia: (media: Media[]) => void;
    productDetail: ProductDetail;
  }
  export interface LocationSelectorProps {
    onCitySelected: (data: object) => void;
    defaultValue?: string;
  }
  export interface ListingTileProps {
    title: string,
    description: string,
    file: any,
    media: Media[],
  };
  export interface Country {
    id: string;
    name: string;
    code: string;
    coordinate: {
      type: string;
      coordinates: number[];
    };
    phoneCode: string;
    currencySymbol: string;
    currencyCode: string;
    regions: Region[];
  }
  export interface Region {
    country: Country;
    cities: Array<City>;
    code: string;
    coordinate?: object;
    id: string;
    name: string;
  }
  export interface City {
    code: string;
    coordinate?: object;
    id: string;
    name: string;
  }
  export interface Media {
    token: string;
    url: string;
    mime: string;
    isPrimary?: boolean;
  }
  