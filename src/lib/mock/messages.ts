import type { Conversation, Message } from '@/lib/types/message'

export const messages: Message[] = [
  {
    id: 'm_1',
    conversationId: 'c_maya_leo',
    senderId: 'u_maya',
    body: 'Hey — just read your High Violet review. The "voices that don\'t do what voices are supposed to" line is going in my notebook.',
    createdAt: new Date('2026-05-04T18:42:00')
  },
  {
    id: 'm_2',
    conversationId: 'c_maya_leo',
    senderId: 'u_leo',
    body: 'Steal away. That\'s the only thing I\'ve been able to think about Berninger for fifteen years.',
    createdAt: new Date('2026-05-04T19:15:00')
  },
  {
    id: 'm_3',
    conversationId: 'c_maya_leo',
    senderId: 'u_maya',
    body: 'Are you going to the show in November? They\'re doing High Violet in full.',
    createdAt: new Date('2026-05-05T09:30:00')
  },
  {
    id: 'm_4',
    conversationId: 'c_benji_leo',
    senderId: 'u_benji',
    body: 'You ever sit with the Alice Coltrane Carnegie Hall recordings? Trying to write something about them and I\'m drowning.',
    createdAt: new Date('2026-05-03T22:11:00')
  },
  {
    id: 'm_5',
    conversationId: 'c_benji_leo',
    senderId: 'u_leo',
    body: 'Once. Couldn\'t finish it in one sitting. Felt rude to try.',
    createdAt: new Date('2026-05-03T22:34:00')
  },
  {
    id: 'm_6',
    conversationId: 'c_benji_leo',
    senderId: 'u_benji',
    body: 'Exactly. Send me whatever you wrote, even if it\'s nothing.',
    createdAt: new Date('2026-05-04T08:05:00')
  },
  {
    id: 'm_7',
    conversationId: 'c_amelia_leo',
    senderId: 'u_amelia',
    body: 'Did you catch the Carrie & Lowell anniversary essay in the Atlantic? They actually got it.',
    createdAt: new Date('2026-05-02T13:07:00')
  },
  {
    id: 'm_8',
    conversationId: 'c_amelia_leo',
    senderId: 'u_leo',
    body: 'Reading it now. The bit about "Fourth of July" being a transcription of a phone call is going to live in my head.',
    createdAt: new Date('2026-05-02T13:42:00')
  },
  {
    id: 'm_9',
    conversationId: 'c_nadia_leo',
    senderId: 'u_nadia',
    body: 'Are you ever going to finish that piece on Erykah\'s influence on Frank Ocean? Asking for a friend who is also me.',
    createdAt: new Date('2026-04-29T16:20:00')
  }
]

export const conversations: Conversation[] = [
  {
    id: 'c_maya_leo',
    participantIds: ['u_leo', 'u_maya'],
    lastMessageId: 'm_3',
    unreadCount: 1
  },
  {
    id: 'c_benji_leo',
    participantIds: ['u_leo', 'u_benji'],
    lastMessageId: 'm_6',
    unreadCount: 0
  },
  {
    id: 'c_amelia_leo',
    participantIds: ['u_leo', 'u_amelia'],
    lastMessageId: 'm_8',
    unreadCount: 0
  },
  {
    id: 'c_nadia_leo',
    participantIds: ['u_leo', 'u_nadia'],
    lastMessageId: 'm_9',
    unreadCount: 1
  }
]

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id)
}

export function getConversationsForUser(userId: string): Conversation[] {
  return conversations
    .filter((c) => c.participantIds.includes(userId))
    .sort((a, b) => {
      const am = messages.find((m) => m.id === a.lastMessageId)
      const bm = messages.find((m) => m.id === b.lastMessageId)
      const at = am?.createdAt.getTime() ?? 0
      const bt = bm?.createdAt.getTime() ?? 0
      return bt - at
    })
}

export function getConversationMessages(conversationId: string): Message[] {
  return messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export function getMessage(id: string): Message | undefined {
  return messages.find((m) => m.id === id)
}

export function getOtherParticipantId(conversation: Conversation, userId: string): string {
  return conversation.participantIds.find((id) => id !== userId) ?? userId
}
