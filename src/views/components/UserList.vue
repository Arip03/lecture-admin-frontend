<template>
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mx-4">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-700">User List</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg">
          <thead>
            <tr class="bg-gray-200 text-left text-sm uppercase text-gray-600 tracking-wider ">
              <th class="py-4 px-6 font-semibold">#</th>
              <th class="py-4 px-6 font-semibold">Name</th>
              <th class="py-4 px-6 font-semibold">Role</th>
              <th class="py-4 px-6 font-semibold">Posts</th>
              <th class="py-4 px-6 font-semibold">Date Joined</th>
              <th class="py-4 px-6 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-t bg-gray-50 hover:bg-gray-100">
              <td class="py-4 px-6 text-gray-700">{{ user.id }}</td>
              <td class="py-4 px-6 text-gray-700">{{ user.name }}</td>
              <td class="py-4 px-6 text-gray-700">{{ user.role }}</td>
              <td class="py-4 px-6 text-gray-700">{{ user.posts }}</td>
              <td class="py-4 px-6 text-gray-700">{{ new Date(user.dateJoined).toLocaleDateString() }}</td>
              <td class="py-4 px-6 flex space-x-2">
                <button @click="editUser(user.id)" class="flex items-center text-blue-600 hover:text-blue-800">
                  <edit-icon class="h-5 w-5" />
                </button>
                <button @click="deleteUser(user.id)" class="flex items-center text-red-600 hover:text-red-800">
                  <trash-icon class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService';

export default {
  setup() {
    const users = ref([]);

    const loadUsers = async () => {
      try {
        const data = await UserService.getUsers();
        users.value = data;
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    const editUser = (userId) => {
      console.log(`Editing user with ID: ${userId}`);
    };

    const deleteUser = (userId) => {
      console.log(`Deleting user with ID: ${userId}`);
      users.value = users.value.filter((user) => user.id !== userId);
    };

    onMounted(loadUsers);

    return {
      users,
      editUser,
      deleteUser,
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }
}
</style>
