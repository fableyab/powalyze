
// Mock message service
const MSG_KEY = 'powalyze_messages';

export const messageService = {
  getMessages: async (threadId) => {
    await new Promise(r => setTimeout(r, 200));
    const msgs = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
    return msgs.filter(m => m.threadId === threadId);
  },

  sendMessage: async (threadId, content, senderId) => {
    await new Promise(r => setTimeout(r, 300));
    const newMsg = {
      id: `msg_${Date.now()}`,
      threadId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const msgs = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
    msgs.push(newMsg);
    localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
    
    return newMsg;
  },

  markAsRead: async (msgId) => {
    const msgs = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
    const index = msgs.findIndex(m => m.id === msgId);
    if (index !== -1) {
      msgs[index].read = true;
      localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
    }
  }
};
