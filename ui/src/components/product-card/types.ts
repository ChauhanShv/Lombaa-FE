export interface ProductCardProps {
  productId: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  mediaSrc: string;
  postedOnDate: string;
  authorName: string;
  authorProfilePicture: string;
  isFavourite: boolean;
  onFavUnfav: (isFav: boolean) => void;
}
