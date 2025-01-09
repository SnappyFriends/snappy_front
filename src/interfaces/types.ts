export interface IFormDataLogin {
  email: string;
  password: string;
}

export interface IFormDataRegister {
  fullname: string;
  birthdate: string;
  genre: "hombre" | "mujer" | "otro" | string;
  email: string;
  username: string;
  password: string;
}

export interface IValidateAge {
  (value: string): boolean | string;
}

export interface ILoginResponse {
  token: string;
  userId: string;
  message: string;
  user_type: string;
  user_status: string;
}

export interface IUserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  userData: IUserData | null;
  setUserData: (data: IUserData | null) => void;
  userGoogle: IUserDataGoogle | null;
  setUserGoogle: (data: IUserDataGoogle | null) => void;
}

export interface IUserDataGoogle {
  email: string;
  googleId: string;
  picture?: string;
  fullname: string;
  username?: string;
  profile_image?: string;
  birthdate?: string;
  description?: string;
  genre?: "hombre" | "mujer" | "otro" | string;
}

export interface IInterest {
  interest_id: string;
  name: string;
}

export interface IUserData {
  id: string;
  fullname: string;
  username: string;
  email: string;
  birthdate: string;
  genre: "hombre" | "mujer" | "otro" | string;
  description: string | null;
  profile_image: string;
  location: { latitude: number; longitude: number } | unknown;
  registration_date: string;
  last_login_date: string;
  user_type: "regular" | "admin" | string;
  status: "active" | "inactive" | string;
  interests: IInterest[] | undefined;
  posts: { post_id: string; fileUrl: string }[];
  following: { id: string; username: string; profile_image: string }[];
  followers: { id: string; username: string; profile_image: string }[];
}

export interface IUserSearch {
  id: number;
  fullname: string;
  username: string;
}

export interface IUserSearchResponse {
  id: string;
  profile_image: string;
  fullname: string;
  username: string;
}

export interface Post {
  post_id: string;
  content: string;
  creation_date: string;
  fileUrl: string;
  reactions: Reaction[];
  comments: Comment[];
  user: {
    id: string;
    username: string;
    profile_image: string;
    user_type: string;
  };
}

export interface Reaction {
  id: string;
  user: {
    id: string;
  };
  reaction: "like" | "dislike";
}

export interface Comment {
  id: string;
  content: string;
  comment_date: string;
  user: {
    id: string;
    username: string;
    profile_image: string;
    user_type: string;
  };
}

export interface IStory {
  story_id: string;
  content: string;
  fileUrl: string | null;
  creation_date: string;
  expiration_date: string;
  user: {
    userId: string;
    username: string;
    fullname: string;
    user_type: string;
  };
}

export interface IStoryResponse {
  stories: IStory[];
}

export interface IStoryCreate {
  content: string;
  fileUrl: string | null;
  creation_date: string;
  expiration_date: string;
  userId: string;
}

export interface Chats {
  chat_id: string;
  id: string;
  key: string;
  messages: [IMessage];
  user_id: string;
  participants: {
    id: string;
    username: string;
    profile_image: string;
  }[];
}

export interface GroupChats {
  group_id: string;
  name: string;
  description: string;
  creation_date: string;
  privacy: string;
  group_members: {
    group_id: string;
    user_id: string;
    role: string;
    join_date: string;
  }[];
  messages: [IGroupMessage];
}

export interface IMessage {
  chat_id: string;
  username: string;
  sender_id: string;
  user_type: string;
  profile_image: string;
  content: string;
  send_date: string;
  type: string;
  is_anonymous: boolean;
}

export interface IGroupMessage {
  message_id: string;
  content: string;
  send_date: string;
  sender: {
    user_id: string;
    username: string;
    fullname: string;
    profile_image: string;
    user_type: string;
  };
}

export interface IUsernameData {
  id: string;
  fullname: string;
  username: string;
  email: string;
  birthdate: string;
  genre: string;
  description: string | null;
  registration_date: string;
  last_login_date: string;
  user_type: "regular" | "admin" | "premium";
  status: "active" | "inactive" | "banned";
  profile_image: string;
  location: { latitude: string; longitude: string };
  googleId: string | null;
  interests: {
    interest_id: string;
    name: string;
  }[];
  posts: { post_id: string; fileUrl: string }[];
  following: {
    id: string;
    following: { id: string; username: string; profile_image: string };
  }[];
  followers: {
    id: string;
    follower: { id: string; username: string; profile_image: string };
  }[];

  // stories: any[];
  // privacy: any[];
  // responses: any[];
  // reportedReports: any[];
  // reportingReports: any[];
  // polls: any[];
  // posts: any[];
  // reactions: any[];
  // comments: any[];
  // groupMembers: any[];
}

export interface IUserChat {
  chat_id: string;
  user_id: string;
  username: string;
  profile_image: string;
}

export interface INotification {
  notification_id: string;
  content: string;
  type: string;
  status: string;
  creation_date: string;
}

export interface IReport {
  report_id: string;
  description: string;
  report_date: string;
  reported_user: {
    id: string;
    fullname: string;
    username: string;
    profile_image: string;
  };
  reporting_user: {
    id: string;
    fullname: string;
    username: string;
    profile_image: string;
  };
}

export interface IPurchase {
  purchase_id: string,
    purchase_date: string,
    expiration_date: string,
    amount: string,
    payment_method: string,
    status: string,
    stripe_session_id: string,
    user: {
      id: string,
      fullname: string,
      username: string,
      profile_image: string
    }
}

export interface IUserReport {
  id: string;
  fullname: string;
  reportCount?: number;
  reportedCount?: number;
}

export interface IReportData {
  usersWhoReport: IUserReport[];
  mostReportedUsers: IUserReport[];
  totalReportedUsers: number;
  totalUnreportedUsers: number;
}

export interface IChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}
