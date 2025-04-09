

import { getUsersRequest, getUserByIdRequest, createUserRequest, updateUserRequest,
     deleteUserRequest } from "~/utils/api";
     import {useUserStore} from "~/store/useUserStore";     

export const useUser = () => {

   const {setUsers} = useUserStore();
   const {users} = storeToRefs(useUserStore());
    
    const createUser= async (query:{
      username:string,
      email:string,
      password:string,
    }) => {
        try {
           const result = await createUserRequest({username:query.username, email:query.email, password: query.password});
           const data = result.data as {
            id:number,
            username:string,
            email:string,
            password:string,
          }

          // Покольку на наш backend   https://jsonplaceholder.typicode.com информация не добавляется-
          // вручную добавляем id
          // в реальной системе эта строка не нужна
          data.id = Number(users.value?.length ?? 0) + 1;


          setUsers([...users.value,data])
           return true;
          } catch (error) {
           return null;
          }
      }


      const getUserById= async (id:number) => {
        try {

          //Это для системы где back только для чтения
          //Мы можем добавить в store элементы, которые нет на back
          // Поэтому запрашиваем из store
          let result; 
          if (users.value)  result = users.value.find(item => item.id == id)
          return result;   
          
          //Это для реальной системы
          // const response = await getUserByIdRequest(id);
          //  return response.data;
        } catch (error) {
          return null;
        }
        }

        const updateUser= async (id:number, query: {
          username: string,
          email:string,
        }) => {
          try {
            //Это для рельной  системы
            //await updateUserRequest(id, query);
            //Это для системы где back только для чтения
            if (users.value) {
              const arr = users.value.map(item => {
                if (item.id === id ) {
                  const elem  = {...item}
                  elem.username=query.username
                  elem.email=query.email
                  return elem;
                } else return item
             } );
             setUsers([...arr]) 
            }

           
            return true;
          } catch (error) {
             return false;
          }
          }


          const deleteUser= async (id:number) => {
            try {
              const result = await deleteUserRequest(id);
              if (result && users.value) {
                users.value = users.value.filter(
                  (user: { id: number; username: string; email: string }) =>
                    user.id !== id
                );
              }
            } catch (error) {
             console.log(error)
            }
            }    

            const fetchUsers = async () => {
              // Если уже запросили и данные есть - 2 раз не запрашиваем
              // В реальной системе эта строка не нужна- мы запрашиваем
              // все равно поскольку данные могут поменяться.
              // А тут - можно, поскольку наш backend https://jsonplaceholder.typicode.com 
              // только для чтения- 
              // хоть изменения идут, но back не меняется
              // работаем со store фактически   
              if (users.value &&  users.value.length  > 0) return;

              try {
                const response = await getUsersRequest();
                setUsers(response?.data)
              } catch (error) {
                console.log(error)
              } 
            };
            

    return {
        createUser,
        getUserById,
        updateUser,
        deleteUser,
        fetchUsers,
    }
}
