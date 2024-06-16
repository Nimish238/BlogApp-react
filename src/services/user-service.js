import axios from "axios";


const baseUrl = 'http://localhost:8080/api';

 const loginApi = async(data) =>{

    try{
        const url = `${baseUrl}/auth/login`;
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
        const url = `${baseUrl}/auth/register`;
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





export {loginApi,register};