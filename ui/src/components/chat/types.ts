export interface User {
  name: string;
  id?: string;
  profilePictureId?: string;
  profilePicture: {
    extension: string;
    id: string;
    mime: string;
    url: string;
  };
}
interface Product {
  title: string;
};
export interface Contacts {
  id: string;
  product: Product;
  to: User;
}
export interface Chat {
  id?: string;
  postedBy: User;
  text: string;
}
export interface ProfilePicture {
  extension: string;
  id: string;
  mime: string;
  url: string;
};