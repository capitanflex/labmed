<script setup>
import {useUsers} from "../hooks/useUsers.js";
import {ref, watch} from "vue";

const users = useUsers();

const isClearBtnHidden = ref(true);

watch(
    [users.searchQuery, users.sortTypes.value],
    () => {
         isClearBtnHidden.value = users.searchQuery.value === '' && !users.sortTypes.value.some(sort => sort.active);
    }
);

</script>

<template>
    <div class="search-container">
        <div class="search-container__search search">
            <img src="../assets/find.svg" alt="Поиск" title="Поиск" class="search__icon">
            <input type="text" class="search__field" placeholder="Поиск по имени или e-mail"
                   v-model="users.searchQuery.value">
        </div>
        <button class="search-container__clear-btn clear-btn" :class="isClearBtnHidden && 'hide'">
            <img src="../assets/clean.svg" alt="clear" class="clear-btn__clear-img">
            <span class="clear-btn__clear-text" @click="users.clearAllFilters()">Очистить фильтр</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
.search-container {
    border-radius: 7px;
    box-shadow: 0 18px 15px 0 rgba(148, 148, 148, 0.28);
    padding: 12px 44px 16px 19px;

    &__search {
        display: flex;
        width: 100%;
        margin-bottom: 24px;
        padding: 5px 3px;
        border-radius: 4px;
        background: rgba(236, 239, 240, 1);
    }

    &__clear-btn {
        display: flex;
        align-items: center;
    }
}

.search {
    &__field {
        color: var(--names-tablet);
        width: 100%;
        height: 34px;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        outline: none;
        border: none;
        margin-left: 4px;
    }
}

.clear-btn {
    &__clear-text {
        color: var(--dark-gray);
        margin-left: 4px;
        border-bottom: 1px dashed transparent;
    }

    &__clear-text:hover {
        border-bottom: 1px dashed var(--dark-gray);
    }
}

</style>