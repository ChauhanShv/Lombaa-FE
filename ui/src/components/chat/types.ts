export interface ChatContentProps {
  chatMessages: any[];
  onReloadChat: () => void;
}
export interface ChatMessage {
  id?: string;
  chatId?: string;
  createdAt?: string;
  deletedAt?: string;
  postedById?: string;
  text?: string;
  updatedAt?: string;
  Chat?: Chat;
}
export interface BuyerSellerData {
  name: string;
  profilePicture?: {
    id: string;
    extension: string;
    mime: string;
    url: string;
  };
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
  profilePicture: {
    extension: string;
    id: string;
    mime: string;
    url: string;
  };
  profilePictureId: string;
}
