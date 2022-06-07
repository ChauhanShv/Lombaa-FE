export interface ReportChatModalProps {
  onReport: () => void;
  onClose: () => void;
}
export interface MediaModalProps {
  mediaSrc: string;
  onClose: () => void | undefined;
}
export interface User {
  name: string;
  id?: string;
  profilePictureId?: string;
  profilePicture: ProfilePicture;
}
interface Product {
  title: string;
  description?: string;
  id: string;
  media: ProductMedia[];
}
export interface Contacts {
  id: string;
  lastMessage: LastMessage;
  product: Product;
  to: User;
}
export interface Chat {
  createdAt: string;
  id?: string;
  media: Media;
  postedBy: User;
  text: string;
}
export interface ProductMedia {
  createdAt: string;
  deletedAt?: string;
  file: Media;
  fileId: string;
  id: string;
  isPrimary: string;
  productId: string;
  updatedAt: string;
}
export interface Media {
  extension: string;
  id: string;
  mime: string;
  url: string;
}
export interface LastMessage {
  createdAt: string;
  id: string;
  text: string;
}
export interface ProfilePicture {
  extension: string;
  id: string;
  mime: string;
  url: string;
}
