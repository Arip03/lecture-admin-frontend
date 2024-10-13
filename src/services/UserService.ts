import { Store } from 'vuex';

interface User {
  id: number;
  firstName: string;
  lastName: string;
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
  constructor(private store: Store<any>) {}

  async getUsers(currentPage: number, pageSize: number): Promise<UserResponse> {
    try {
      console.log('Fetching users from store for page:', currentPage, 'with page size:', pageSize);

      const usersFromStore = this.store.state.users;
      const paginatedUsers = this.paginateUsers(usersFromStore, currentPage, pageSize);

      return {
        pageSize,
        currentPage,
        totalElements: usersFromStore.length,
        totalPages: Math.ceil(usersFromStore.length / pageSize),
        users: paginatedUsers,
      };
    } catch (error) {
      console.error('Error fetching users from store:', error);
      throw error;
    }
  }

  paginateUsers(users: User[], currentPage: number, pageSize: number): User[] {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return users.slice(start, end);
  }
}

export default (store: Store<any>) => new UserService(store);
