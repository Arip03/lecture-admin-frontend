<template>
  <div>
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-700">User List</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr class="bg-gray-200 text-left text-sm uppercase text-gray-600 tracking-wider">
            <th class="py-4 px-6 font-semibold">#</th>
            <th class="py-4 px-6 font-semibold">First Name</th>
            <th class="py-4 px-6 font-semibold">Last Name</th>
            <th class="py-4 px-6 font-semibold">Role</th>
            <th class="py-4 px-6 font-semibold">Posts</th>
            <th class="py-4 px-6 font-semibold">Date Joined</th>
            <th class="py-4 px-6 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="border-t bg-gray-50 hover:bg-gray-100">
            <td class="py-4 px-6 text-gray-700">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="py-4 px-6 text-gray-700">{{ user.firstName }}</td>
            <td class="py-4 px-6 text-gray-700">{{ user.lastName }}</td>
            <td class="py-4 px-6 text-gray-700">{{ user.role }}</td>
            <td class="py-4 px-6 text-gray-700">{{ user.posts }}</td>
            <td class="py-4 px-6 text-gray-700">{{ new Date(user.dateJoined).toLocaleDateString() }}</td>
            <td class="py-6 px-6 flex space-x-4">
              <router-link :to="{ name: 'Form', params: { id: user.id } }">
                <button class="flex items-center text-blue-600 hover:text-blue-800">
                  <edit-icon class="h-5 w-5" />
                </button>
              </router-link>
              <button @click="deleteUser(user.id)" class="flex items-center text-red-600 hover:text-red-800">
                <trash-icon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4">
      <div class="flex space-x-2 justify-center w-full">
        <PaginationButton
          v-for="page in paginationButtons"
          :key="page"
          :label="page"
          :page="page"
          :isActive="page === currentPage"
          @update:page="updatePage"
        />
      </div>
      <div class="mt-1">
        <span>Total {{ totalElements }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import PaginationButton from '@/components/dashboard/PaginationButton.vue';
import userServiceFactory from '@/services/UserService';
import { useStore } from 'vuex';

export default {
  components: {
    PaginationButton,
  },
  setup() {
    const store = useStore();
    const userService = userServiceFactory(store);

    const users = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);

    const loadUsers = async () => {
      try {
        const userResponse = await userService.getUsers(currentPage.value, pageSize.value);
        users.value = userResponse.users;
        totalElements.value = userResponse.totalElements;
        totalPages.value = userResponse.totalPages;
        console.log('Loaded users:', userResponse);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    const paginationButtons = computed(() => {
      return Array.from({ length: totalPages.value }, (_, i) => i + 1);
    });

    const deleteUser = async (userId) => {
      try {
        await store.dispatch('removeUser', userId);
        // Reload users after deletion
        await loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const updatePage = async (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        await loadUsers();
      }
    };

    onMounted(() => loadUsers());

    return {
      users,
      currentPage,
      totalPages,
      pageSize,
      paginationButtons,
      deleteUser,
      updatePage,
    };
  },
};
</script>
