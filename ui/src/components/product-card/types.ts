export interface ProductCardProps {
  productId: string;
  slug: string;
  title: string;
  price?: string;
  location?: string;
  mediaSrc: string;
  userId: string;
  authorName: string;
  authorProfilePicture: string;
  isFavourite: boolean;
  onFavUnfav: (isFav: boolean) => void;
}
