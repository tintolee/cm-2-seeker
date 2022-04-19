export type RootStackParamList = {
  Root: undefined,
  NotFound: undefined,
  Contacts: undefined,
  ChatRoom: undefined,
};

export type MainTabParamList = {
  Camera: undefined,
  Chats: undefined,
  Status: undefined,
  Calls: undefined,
};

export type TabOneParamList = {
  TabOneScreen: undefined,
};

export type TabTwoParamList = {
  TabTwoScreen: undefined,
};

export type seeker = {
  id: String,
  name: String,
  imageUri: String,
  status: String,
};

export type Message = {
  id: String,
  content: string,
  createdAt: string,
  user: User,
};

export type newChatRoom = {
  id: String,
  users: User[],
  lastMessage: Message,
};
