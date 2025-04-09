export const validateEmail = (email: string) => {
    if (!email) return false;
    const regex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!regex.test(email)) {
        return false;
    } 
     return true
};

export const validatePassword = (password: string) => {
    if (!password) return false;
    if (password.length < 1)  return false;
    return true
};

export const validateName = (name: string) => {
    if (!name) return false;
    return true
};
