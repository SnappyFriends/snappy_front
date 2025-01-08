export interface User {
  id: string;
  username: string;
  fullname: string;
  profile_image: string;
  isOnline: boolean;
  friends: [];
  email?: string;
  genre?: string;
  user_type?: string;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async (interest?: string): Promise<User[]> => {
  try {
    let response;
    if (interest) {
      response = await fetch(`${API_URL}/users?${interest}`, {
        next: { revalidate: 1200 },
        method: "GET",
      });
    } else {
      response = await fetch(`${API_URL}/users`, {
        next: { revalidate: 1200 },
        method: "GET",
      });
    }

    if (!response.ok) {
      console.error("Error fetching users");
    }

    const users: User[] = await response.json();
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUsersByUsername = async (username: string) => {
  try {
    const response = await fetch(`${API_URL}/users/username/${username}`, {
      next: { revalidate: 1200 },
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching users");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUsersSearchbar = async (
  username: string,
  interest?: string
) => {
  try {
    let users;
    if (interest) {
      users = await getUsers(interest);
    } else {
      users = await getUsers();
    }
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );
    return filteredUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      console.error("Error fetching user");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};

export const fetchFriends = async (userId: string): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/follow/${userId}/friends`);
    if (!response.ok) {
      console.log("Error fetching friends");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};
