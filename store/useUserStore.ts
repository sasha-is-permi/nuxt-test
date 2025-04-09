import { defineStore, skipHydrate } from 'pinia'

export const useUserStore = defineStore('userStore', () => {

    const users: Ref< {
        id:number,
        username:string,
        email:string,
        password:string,
      }[]|null> = ref(null);

    const setUsers = (value: []) =>  {
        users.value = value;
    }

    return {
     users,
     setUsers
    }
})
