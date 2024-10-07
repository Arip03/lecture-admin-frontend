import apiClient from '@/api/ApiClient';

interface User {
  id: number;
  name: string;
  role: string;
  posts: number;
  dateJoined: string;
}

interface UserResponse {
  pageSize: number;
  currentPage: number;
  totalElements: number;
  totalPages: number;
  users: User[];
}

class UserService {
  async getUsers(currentPage: number, pageSize: number): Promise<UserResponse> {
    try {
      console.log(currentPage, pageSize)
      const response: UserResponse = await apiClient.get(`/json-files/users.json`);
      return response;  
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  }
}

export default new UserService();
