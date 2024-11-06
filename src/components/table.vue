<script setup>
import {useUsers} from "../hooks/useUsers.js";
import {ref, watch} from "vue";

const users = useUsers();


</script>

<template>
    <div class="table-container">
        <div class="table-container__table table">
            <div class="table__row row table__head">
                <div class="row__el">Имя пользователя</div>
                <div class="row__el">E-mail</div>
                <div class="row__el">Дата регистрации</div>
                <div class="row__el">Рейтинг</div>
                <div class="row__el close "></div>
            </div>
            <div v-if="users.filteredUsers.value && users.filteredUsers.value[users.currentPage.value - 1]"
                 v-for="user in users.filteredUsers.value[users.currentPage.value - 1]"
                 :key="user.id"
                 class="table__row row">
                <div class="row__el username">{{ user.username }}</div>
                <div class="row__el">{{ user.email }}</div>
                <div class="row__el">{{ user.registration_date.split('T')[0] }}</div>
                <div class="row__el">{{ user.rating }}</div>
                <div
                    class="row__el close"
                    @click="users.userToDelete.value = user.id"
                >
                    <img src="../assets/cancel.svg" alt="удалить" title="удалить">
                </div>
            </div>
        </div>
        <div class="table-container__paginator paginator">
            <span
                class="paginator-p"
                v-for="(user, index) in users.filteredUsers.value"
                :key="index"
                :class="users.currentPage.value === index + 1 && 'active'"
                @click="users.currentPage.value = index + 1"
            >{{ index + 1 }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.table-container {
    margin-top: 15px;
    padding: 16px;

    font-weight: 500;

    &__paginator {
        display: flex;
        justify-content: center;
        margin: 30px 0;
        gap: 15px;
        font-weight: 400;
        color: var(--names-tablet);
    }
}

.table {
    &__row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 20px;
        color: var(--names-tablet);
    }

    &__head {
        color: var(--names-tablet);
        margin-bottom: 26px;
        font-size: 10px;
    }
}

.row {
    &__el {
        flex: 1 1;
    }
}

.username {
    font-weight: 700;
    color: var(--username);
}

.close {
    flex: 0 0;
    cursor: pointer;
    min-width: 16px;
}

.paginator-p {
    cursor: pointer;

    &.active {
        color: var(--username);
    }
}

</style>