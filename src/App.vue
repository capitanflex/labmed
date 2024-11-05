<script setup>

import Head from "./components/head.vue";
import Table from "./components/table.vue";
import Sort from "./components/sort.vue";
import {useUsers} from "./scripts/useUsers.js";
import DeleteUser from "./components/deleteUser.vue";

useUsers();
</script>

<template>
    <Head/>
    <Sort/>
    <Table/>

    <delete-user/>
</template>

<style scoped>

</style>
