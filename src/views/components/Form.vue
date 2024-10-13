<template>
  <div class="relative">
    <div class="absolute top-4 left-4">
      <router-link :to="{ name: 'Users' }">
        <button class="px-5 py-3 text-sm font-medium text-white bg-gray-500 rounded-xl hover:bg-gray-600 focus:outline-none">
          Back
        </button>
      </router-link>
    </div>

    <form class="max-w-md mx-auto my-8 bg-gray-100 p-6 rounded-lg shadow-lg" @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model="user.firstName"
          class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="First Name"
          required
        />
      </div>
      <div class="mb-5">
        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model="user.lastName"
          class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Last Name"
          required
        />
      </div>
      <div class="mb-5">
        <label for="role" class="block mb-2 text-sm font-medium text-gray-900">Role</label>
        <select
          id="role"
          v-model="user.role"
          class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        >
          <option v-for="roleOption in roles" :key="roleOption" :value="roleOption">
            {{ roleOption }}
          </option>
        </select>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const userId = route.params.id;
    const user = ref({
      firstName: '',
      lastName: '',
      role: '',
      // Include all necessary fields
      id: null,
      posts: 0,
      dateJoined: '',
    });

    const roles = store.getters.getRoles;

    onMounted(() => {
      const existingUser = store.getters.getUserById(userId);
      if (existingUser) {
        // Merge existing user data to ensure all fields are present
        user.value = { ...existingUser };
      }
    });

    const handleSubmit = async () => {
      try {
        await store.dispatch('editUser', { ...user.value });
        console.log('Updated users:', store.state.users);
        router.push({ name: 'Users' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    return {
      user,
      roles,
      handleSubmit,
    };
  },
};
</script>
