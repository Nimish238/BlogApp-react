import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

const getAllCategories = async() =>{

    try{
        const url = `${baseUrl}/categories/`;
        console.log("Requested Url:",url);

        const response = await axios.get(url);

        if(response && response.data){  
            return response.data;
        }
        else{
            throw new Error('No response data');
        }

    }catch(error){
        console.error('Error fetching data:',error);
        throw error;
    }
} 

export {getAllCategories};