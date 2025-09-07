import { jwtStorage } from "../utils/jwtStorage"

const baseUrl = import.meta.env.VITE_BASE_URL


export const getDataPrivate = async () =>{
    try{
        const token = await jwtStorage.retrieveToken()
        const response = await fetch(`${baseUrl}/api/v1/protected/data`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(!response.ok) throw new Error("failed to get data private")
        const result = await response.json()
        return result
    }catch(error){
        throw error
    }
}

export const register = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    return {
      status: response.status, // ambil status HTTP
      data: result,            // isi body JSON
    };
  } catch (error) {
    throw error;
  }
};


export const loginProses = async (values) =>{
    try{
        const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method:"POST",
            body: values
        })
        if(!response.ok) throw new Error("feiled to login")
        const result = await response.json()
        return result
    }catch(error){
        throw error
    }
}