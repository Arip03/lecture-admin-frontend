import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          role: "Admin", // Capitalized
          posts: 24,
          dateJoined: "2022-01-15"
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          role: "Author", // Capitalized
          posts: 18,
          dateJoined: "2023-03-20"
        },
        {
          id: 3,
          firstName: "Jane",
          lastName: "Smith",
          role: "Author", // Capitalized
          posts: 18,
          dateJoined: "2023-03-20"
        },
      ],
      lectures: [
        {
        }
      ],
      roles: [
        "Admin",   // Capitalized
        "Author"   // Capitalized
      ]
    };
  },
  mutations: {
    addUser(state, user) {
      state.users.push({ ...user, id: state.users.length + 1, dateJoined: new Date().toISOString() });
    },
    editUser(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, { ...state.users[index], ...updatedUser });
      }
    },
    removeUser(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
    addLecture(state, lecture) {
      state.lectures.push(lecture);
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('addUser', user);
    },
    editUser({ commit }, updatedUser) {
      commit('editUser', updatedUser);
    },
    removeUser({ commit }, userId) {
      commit('removeUser', userId);
    },

    // Lecture Actions
    addLecture({ commit }, lecture) {
      commit('addLecture', lecture);
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === parseInt(id));
    },
    getRoles(state) {
      return state.roles;
    },
    getLectures(state) {
      return state.lectures;
    }
  },
});


export default store;
