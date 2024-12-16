export interface User {
  id: string;       
  username: string;
  fullname: string;
  profile_image: string; 
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;


  export const getUsers = async (): Promise<User[]> => {

    try {
      const response = await fetch(`${API_URL}/users`, {
        next: { revalidate: 1200 },
        method: 'GET',
        
      });
  
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
  
      const users: User[] = await response.json();
      console.log(users)
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  export const getUsersByUsername = async (username: string): Promise<User[]> => {
    try {
      const users = await getUsers();
      const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(username.toLowerCase()) || 
        user.fullname.toLowerCase().includes(username.toLowerCase()) 
      );
      console.log(filteredUsers);
      return filteredUsers;
    } catch (error) {
      console.error('Error filtering users by username or fullname:', error);
      throw error;
    }
  };
  
  export const getUserById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`); 
      if (!response.ok) {
        throw new Error('Error fetching user');
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; 
    }
  };