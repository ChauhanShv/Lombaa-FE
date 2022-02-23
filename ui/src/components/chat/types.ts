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
}
export interface BuyerSellerData {
    name: string;
    profilePicture?: {
        id: string,
        extension: string,
        mime: string,
        url: string,
    },
    profilePictureId?: string,
}
