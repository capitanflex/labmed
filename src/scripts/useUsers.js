import {ref, onMounted, watch} from 'vue';
import axios from 'axios';

const users = ref([]);
const filteredUsers = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const userToDelete = ref(null);
const sortTypes = ref([
    {id: 1, name: 'Дата регистрации', fieldName: 'registration_date', active: false},
    {id: 2, name: 'Рейтинг', fieldName: 'rating', active: false},
]);

export function useUsers() {
    const fetchUsers = async () => {
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
        sortTypes.value.forEach((type) =>  {
            type.active = false;
        })
        searchQuery.value = "";
    };

    const sortUsers = (sortTypeId) => {
        const allFilteredUsers = filteredUsers.value.flat();

        sortTypes.value.forEach(sort => {
            sort.active = sort.id === sortTypeId;
        })

        allFilteredUsers.sort((a, b) => {
            if (sortTypes.value[sortTypeId-1].fieldName === 'registration_date') {
                return new Date(b.registration_date) - new Date(a.registration_date);
            } else if (sortTypes.value[sortTypeId-1].fieldName === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

        paginateUsers(allFilteredUsers);
    }

    const deleteUser = (userId) => {
       users.value = users.value.filter(user => user.id !== userId);
       paginateUsers(users.value);

       userToDelete.value = null;
    }

    watch(searchQuery, (newValue) => {
        filterUsers()
    });

    onMounted(() => {
        fetchUsers();
    });

    return { users, filteredUsers, searchQuery, currentPage, userToDelete , sortTypes, clearAllFilters, sortUsers, deleteUser };
}