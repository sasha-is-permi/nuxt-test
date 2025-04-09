

import { getUsersRequest, getUserByIdRequest, createUserRequest, updateUserRequest,
     deleteUserRequest } from "~/utils/api";

export const useUser = () => {

  const router = useRouter();

    const users = ref([]);
    
    const createUser= async (query:{
      username:string,
      email:string,
      password:string,
    }) => {
        try {
            await createUserRequest({username:query.username, email:query.email, password: query.password});
            alert("Пользователь успешно создан!");
            router.push("/");
          } catch (error) {
            console.error(error);
          }
      }


      const getUserById= async (id:string) => {
        try {
          const response = await getUserByIdRequest(id);
          return response.data;
        } catch (error) {
          return null;
        }
        }

        const updateUser= async (id:string, query: {
          username: string,
          email:string,
        }) => {
          try {
            await updateUserRequest(id, query);
            return true;
          } catch (error) {
             return false;
          }
          }


          const deleteUser= async (id:string) => {
            try {
              await deleteUserRequest(id);
              return true;
            } catch (error) {
             return false;
            }
            }    

            const fetchUsers = async () => {
              try {
                const response = await getUsersRequest();
                return response?.data
            //    users.value = response.data;
              } catch (error) {
               return null;
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
