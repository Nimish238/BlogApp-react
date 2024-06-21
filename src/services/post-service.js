import axios from "axios";
import Cookies from "js-cookie";
// import FormData from "form-data";

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



// const createPost = async(data) =>{

//     const privateAxios = axios.create({
//         baseURL:baseURL,
//         withCredentials:true
//     });
    
//     privateAxios.interceptors.request.use(config =>{
//         const token = getToken();
//         console.log('token',token);
//         if(token){
           
//             config.headers.Authorization = `Bearer ${token}`
//             console.log('config',config);
//             return config
//         }
        
//     },error =>Promise.reject(error))

//     try{
//         const url = `${baseURL}/user/${data.userId}/category/${data.categoryId}/posts`;
//         console.log("Requested url:",url);

//         const formData = new FormData();
//         formData.append('data',JSON.stringify({
//             'title':data.title,
//             'content':data.content
//         }));

//         // formData.append('image',data.image);

//         // for (var pair of formData.entries()) {
//         //     console.log(pair[0]+ ', ' + pair[1]); 
//         // }


//         const response = await privateAxios.post(url,formData,{
//             headers:{
//                 'Content-Type':'multipart/form-data'
//             }
//         });

//         console.log('response',response);
//         if(response&&response.data){
//             console.log(response.data);
//             return response.data;
//         }else{
//             throw new Error('No response data');
//         }
//     }catch(error){
//         console.error("error fetching data:",error);
//         throw error;
//     }

// }


const getAllPosts = async(pageNumber,pageSize) =>{

    try {
        const response = await axios.get(`${baseURL}/posts`, {
            params: {
                pageNumber: `${pageNumber}`,
                pageSize: `${pageSize}`,
                sortBy: 'addedDate',
                sortDir: 'desc'
            }
        });
        console.log('Fetched posts:', response.data);
        if(response&&response.data){
            console.log(response.data);
            return response.data;
        }else{
            throw new Error('No response data');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
} 

const getPostById = async(postId) =>{

    try{
        const response = await axios.get(`${baseURL}/posts/${postId}`);
        if(response&&response.data){
            console.log(response.data);
            return response.data;
        }else{
            throw new Error('No response data');
        }

    }
    catch(error){
        console.error('Error fetching posts:', error);
    }

}

const createComment = async(userId,postId,comment) =>{

    try{
        const url = `${baseURL}/user/${userId}/post/${postId}/comments`;
        console.log("Requested url:",url);
        const response = await privateAxios.post(url,comment);

        if(response && response.data){
            console.log(response.data);
            return response.data;
        }
        else{
            throw new Error("NO response data");
        }
        
    }catch(error){
        console.error('Error fetching posts:', error);
    }

}




export {getAllPosts,getPostById,createComment};