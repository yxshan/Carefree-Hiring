import { defineStore } from "pinia";
import { systemList, chatMessageList } from "../api/message";
export const messageStore = defineStore({
  id: 'message', 
  state: () => {
    return {
      systemMessageList: [] ,
      systemNewMessage: [] as string[],
      messageList: []
    };
  },
  actions: {
    /**
     * 获取系统消息列表
     * 
     * 该方法通过调用 `systemList` API 获取系统消息列表，并根据返回结果更新本地状态。
     * 如果返回结果存在且不为空，则将第一条消息作为新消息存储在 `systemNewMessage` 数组中。
     * 
     * @returns {Promise<void>} 无返回值，因为该方法是异步的，并且不返回任何数据。
     */
    async getSystemMessageList(): Promise<void> {
      const res = await systemList({
        type: 0,
        is_informtype: 2, 
      });
      if(res) {
        this.systemMessageList = res.data;
        if(this.systemMessageList[0]) {
          this.systemNewMessage = [this.systemMessageList[0]];
        }
      }
    },
    async getChatMessageList(): Promise<void> {
      const res = await chatMessageList({});
      if(res) {
        this.messageList = res.data;
      }
    },
  }
});