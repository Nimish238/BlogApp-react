import axios from "axios";
import Cookies from "js-cookie";


const baseURL = 'http://localhost:8080/api';

const getToken = () => {
    return Cookies.get('token');
};

    const privateAxios = axios.create({
        baseURL:baseURL,
        withCredentials:true
    });
    
    privateAxios.interceptors.request.use(config =>{
        const token = getToken();
        console.log('token',token);
        if(token){
           
            config.headers.Authorization = `Bearer ${token}`
            console.log('config',config);
            return config
        }
        
    },error =>Promise.reject(error))

 const loginApi = async(data) =>{

    try{
        const url = `${baseURL}/auth/login`;
        console.log("Requested url:",url);

        const response = await axios.post(url,data);
       
        if(response && response.data){  
            return response.data;
        }
        else{
            throw new Error('No response data');
        }
    }
    catch(error){
        console.error('Error fetching data:',error);
        throw error;
    }

}

const register = async (user) => {
    try {
        const url = `${baseURL}/auth/register`;
        console.log("Requested url:",url);
       
        const response = await axios.post(url, user);
        if (response && response.data) {
            console.log('Response data:', response.data); // Debugging line
            return response.data;
        } else {
            throw new Error('No response data');
        }
    } catch(error){
        console.error('Error fetching data:',error);
        throw error;
    }
};


const getUserById = async(userId) =>{
    try{
        const url = `${baseURL}/users/getUserById/${userId}`;
        console.log("Requested url:",url);

        const response = await axios.get(url);
        if(response && response.data){
            return response.data;
        }
        else{
            throw new Error('No response data');
        }
    }catch(error){
        console.log("Error fetching data:",error);
    }
}

const deleteUserById = async(userId) =>{

    try{
        const url = `${baseURL}/users/deleteUser/${userId}`;
        console.log("Requested url:",url);
    
        const response = await privateAxios.delete(url);
        if(response && response.data){
            return response.data;
        }
        else{
            throw new Error('No response data');
        }

    }catch(error){
        console.log("Error fetching data:",error);
    }
}

const getAllUsers = async() =>{
    try{
        const url = `${baseURL}/users/getAllUsers/`
        console.log("Requested url:",url);

        const response = await privateAxios.get(url);
        if(response && response.data){
            return response.data;
        }
        else{
            throw new Error("No response data");
        }
    }
    catch(error){
        console.log("Error fetching data:",error);
    }
}

const updateUser = async(user) =>{
    try{
        const url = `${baseURL}/users/updateUser`;
        console.log("Requested url:",url);

        const response = await privateAxios.put(url,user);
        if(response && response.data){
            return response.data;
        }
        else{
            throw new Error("No response data");
        }

    }catch(error){
        console.log("Error fetching data:",error);
    }
}

const updateUserPassword = async(user) =>{
    try{
        const url = `${baseURL}/auth/resetPassword`;
        console.log("Requested url:",url);

        const response = await axios.post(url,user);
        if(response && response.data){
            return response.data;
        }
        else{
            throw new Error("No response data");
        }
    }catch(error){
        console.log("Error fetching data:",error);
    }
}

export {loginApi,register,getUserById,deleteUserById,getAllUsers,updateUser,updateUserPassword};