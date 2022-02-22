export interface ChatContentProps {
  chatMessages: any[];
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
