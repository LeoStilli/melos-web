export interface Conversation {
  id: string
  participantIds: string[]
  lastMessageId: string
  unreadCount: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  body: string
  createdAt: Date
}
