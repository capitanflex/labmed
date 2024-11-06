import {ref, watch} from 'vue';
import axios from 'axios';

const users = ref([]);
const filteredUsers = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const userToDelete = ref(null);
const sortTypes = ref([
    {id: 1, name: 'Дата регистрации', fieldName: 'registration_date', active: false, isAsc: false},
    {id: 2, name: 'Рейтинг', fieldName: 'rating', active: false, isAsc: false},
]);

export const fetchUsers = async () => {
    try {
        const response = await axios.get('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');
        users.value = response.data;
        paginateUsers(users.value);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const paginateUsers = (userArray) => {
    filteredUsers.value = [];
    for (let i = 0; i < userArray.length; i += 5) {
        filteredUsers.value.push(userArray.slice(i, i + 5));
    }
};

export function useUsers() {
    const filterUsers = () => {
        if (searchQuery.value == null) {
            return;
        }
        const filteredUsers = users.value.filter(user =>
            user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        paginateUsers(filteredUsers);
    };

    const clearAllFilters = () => {
        sortTypes.value.forEach((type) => {
            type.active = false;
        })
        searchQuery.value = "";
        paginateUsers(users.value)
    };

    const sortUsers = (sortTypeId) => {
        const allFilteredUsers = filteredUsers.value.flat();

        sortTypes.value.forEach(sort => {
            if (sort.id === sortTypeId) {
                sort.isAsc = !sort.isAsc;
                sort.active = true;
            } else {
                sort.isAsc = true;
                sort.active = false;
            }
        });

        allFilteredUsers.sort((a, b) => {
            const sortField = sortTypes.value[sortTypeId - 1].fieldName;
            const isAsc = sortTypes.value[sortTypeId - 1].isAsc ? 1 : -1; // Устанавливаем направление сортировки

            if (sortField === 'registration_date') {
                return isAsc * (new Date(a.registration_date) - new Date(b.registration_date));
            } else if (sortField === 'rating') {
                return isAsc * (a.rating - b.rating);
            }
            return 0;
        });

        paginateUsers(allFilteredUsers);
    };


    const deleteUser = (userId) => {
        users.value = users.value.filter(user => user.id !== userId);
        paginateUsers(users.value);

        userToDelete.value = null;
    }

    watch(searchQuery, (newValue) => {
        filterUsers()
    });


    return {
        users,
        filteredUsers,
        searchQuery,
        currentPage,
        userToDelete,
        sortTypes,
        clearAllFilters,
        sortUsers,
        deleteUser
    };
}