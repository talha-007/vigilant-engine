import { callAPi, callAPiMultiPart } from "./http-common";

interface createChat {
  second_participant: string;
}
interface sendChat {
  chat_room: number;
  content: string;
}
const createRoom = (data: createChat) =>
  callAPiMultiPart.post("/chat/chat-rooms", data);

const getChatRooms = (email: string) =>
  callAPi.get(`/chat/chat-rooms?email=${email}`);

const sendMessage = (data: sendChat) =>
  callAPiMultiPart.post("/chat/messages/", data);

const chatServices = {
  createRoom,
  getChatRooms,
  sendMessage,
};

export default chatServices;
