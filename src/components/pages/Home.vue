<template>
    <div>
        <h1 class="is-size-1 has-text-centered">Welcome home, {{ user.name }} {{ user.surname }} !</h1>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['user']),
  };
</script>
