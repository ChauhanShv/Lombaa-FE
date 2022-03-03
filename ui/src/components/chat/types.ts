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
  id?: string;
  postedBy: User;
  text: string;
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
