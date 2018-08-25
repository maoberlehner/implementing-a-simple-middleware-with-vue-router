<template>
  <div class="User">
    <h1>Hello {{ name }}!</h1>
  </div>
</template>

<script>
export default {
  name: `About`,
  data() {
    return {
      name: `John Doe`,
    };
  },
};
</script>
