'use strict'
const Message = use('App/Models/Message')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onMessage (messageData) {
    if (messageData.type === 'message') {

      const { userId, groupId, message } = messageData
  
      const messageModel = new Message()
      messageModel.user_id = userId
      messageModel.group_id = groupId
      messageModel.message = message
  
      await messageModel.save()
    }

    this.socket.broadcastToAll('message', messageData)
  }
}

module.exports = ChatController
