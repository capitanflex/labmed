<script setup>

import Search from "./search.vue";

</script>

<template>
    <div class="head">
        <h1 class="head__title">Список пользователей</h1>
    </div>
    <Search/>
</template>

<style scoped lang="scss">
.head {
    &__title {

        font-size: 24px;
        font-weight: 700;
        line-height: 28px;

    }
}
</style>