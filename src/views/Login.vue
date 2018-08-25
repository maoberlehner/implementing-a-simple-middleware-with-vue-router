<template>
  <div class="Login">
    <h1>Login</h1>
    <button
      v-if="loggedIn"
      @click="logout"
    >
      Log me out
    </button>
    <button
      v-else
      @click="login"
    >
      Log me in
    </button>
  </div>
</template>

<script>
const JWT = `jwt`;

export default {
  name: `Login`,
  data() {
    return {
      loggedIn: localStorage.getItem(JWT),
    };
  },
  methods: {
    login() {
      localStorage.setItem(JWT, `foo.bar.baz`);
      this.loggedIn = true;
      this.$router.push({ name: `user` });
    },
    logout() {
      localStorage.removeItem(JWT);
      this.loggedIn = false;
    },
  },
};
</script>
