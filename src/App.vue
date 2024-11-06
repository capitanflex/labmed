<script setup>

import Head from "./components/head.vue";
import Table from "./components/table.vue";
import Sort from "./components/sort.vue";
import {fetchUsers, useUsers} from "./hooks/useUsers.js";
import DeleteUser from "./components/deleteUser.vue";
import {onMounted} from "vue";

onMounted(() => {
    fetchUsers();
});
</script>

<template>
    <Head/>
    <Sort/>
    <Table/>
    <delete-user/>
</template>

<style scoped>

</style>
