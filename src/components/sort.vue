<script setup>
import {useUsers} from "../hooks/useUsers.js";

const users = useUsers();
</script>

<template>
    <div class="sort-container">
        <div class="sort-container__sort sort">
            <span class="sort__label">Сортировка:</span>
            <div class="sort__types types">
            <span
                v-for="type in users.sortTypes.value"
                :key="type.id" class="types__type"
                :class="type.active && 'active'"
                @click="users.sortUsers(type.id)"
            >{{ type.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sort-container {
    margin-top: 72px;
    font-size: 10px;
    color: var(--names-tablet);

    &__sort {
        display: flex;
        gap: 8px;
    }
}

.sort {
    &__types {
        display: flex;
        gap: 8px;
    }
}

.types {
    &__type {
        border-bottom: 1px dashed var(--names-tablet);
        cursor: pointer;
    }

    &__type:hover {
        color: var(--dark-gray);
        border-bottom: 1px dashed var(--dark-gray);
    }

    &__type.active {
        color: var(--dark-gray);
        border-bottom: 1px dashed var(--dark-gray);
    }
}
</style>