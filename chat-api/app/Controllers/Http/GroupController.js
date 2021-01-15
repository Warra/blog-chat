'use strict'
const Message = use('App/Models/Message')

class GroupController {
  async getMessages({ params }) {
    const messageData = await Message.query().where('group_id', params.groupId).fetch()
    const messages = messageData.toJSON().map(({ user_id, group_id, message }) => {
      return {
        userId: Number(user_id),
        groupId: Number(group_id),
        message,
        isMine: Number(params.userId) === Number(user_id) ? true : false
      }
    })

    return JSON.stringify(messages)
  }
}

module.exports = GroupController
