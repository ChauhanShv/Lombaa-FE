export interface User {
  name: string;
  id?: string;
  profilePictureId?: string;
  profilePicture: ProfilePicture;
}
interface Product {
  title: string;
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
