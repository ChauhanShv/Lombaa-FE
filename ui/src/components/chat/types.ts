export interface ChatContentProps {
  chatMessages: any[];
  messageReceiver: MessageReceiver;
  onReloadChat: () => void;
}
export interface MessageReceiver {
  name: string;
  profilePicture: ProfilePicture;
  profilePictureId: string;
}
export interface ChatMessage {
  id?: string;
  createdAt?: string;
  postedBy?: {
    id?: string;
    name?: string;
    profilePicture?: ProfilePicture;
    profilePictureId?: string;
  };
  text?: string;
  Chat?: Chat;
}
export interface BuyerSellerData {
  name: string;
  profilePicture?: ProfilePicture;
  profilePictureId?: string;
}
export interface Chat {
  archived?: string;
  buyerDeletedAt?: string;
  buyerId?: string;
  createdAt?: string;
  deletedAt?: string;
  id: string;
  productId: string;
  seller: Seller;
  sellerDeletedAt: string;
  sellerId: string;
  updatedAt: string;
}
export interface Seller {
  name: string;
  profilePicture: ProfilePicture; 
  profilePictureId: string;
}
export interface ProfilePicture {
  extension: string;
  id: string;
  mime: string;
  url: string;
};