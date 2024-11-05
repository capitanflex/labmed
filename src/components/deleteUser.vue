<script setup>
import {useUsers} from "../scripts/useUsers.js";

const users = useUsers();
</script>

<template>
<div class="delete-user-container" :class="users.userToDelete.value? '' : 'hide'">
    <p class="delete-user-container__title">Вы уверены, что хотите удалить пользователя?</p>
    <div class="delete-user-container__btns btns">
        <div class="btns__yes" @click="users.deleteUser(users.userToDelete.value)">Да</div>
        <div class="btns__no" @click="users.userToDelete.value = null">Нет</div>
    </div>
</div>
</template>

<style scoped lang="scss">
    .delete-user-container {
        position: absolute;
        width: 353px;
        padding: 36px 36px 32px 36px;
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        box-shadow: 0 0 15px 10px rgba(148, 148, 148, 0.28);
        font-size: 12px;
        text-align: center;


        &__btns {
            display: flex;
            gap: 36px;
            justify-content: center;
            margin-top: 24px;


            & > div {
                width: 88px;
                padding: 6px 0;
                background: rgb(222, 222, 222);
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }

    .btns {
        &__yes {
            color: rgba(130, 130, 130, 1);
            &:hover {
                background: rgb(206, 206, 206) !important;
            }
        }
        &__no {
            background: rgba(12, 180, 241, 1) !important;
            color: white;

            &:hover {
                background: rgb(12, 168, 225) !important;
            }
        }
    }
</style>