import apiClient from '@/api/ApiClient';

interface User {
  id: number;
  name: string;
  role: string;
  posts: number;
  dateJoined: string;
}

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/json-files/users.json');
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

export default new UserService();
