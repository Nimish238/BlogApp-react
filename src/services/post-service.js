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
            return config
        }
        
    },error =>Promise.reject(error))



    const createPost = async(data) =>{

        const userId=data.userId;
        const categoryId = data.categoryId;

        const url = `${baseURL}/user/${userId}/category/${categoryId}/posts`;
        console.log("Requested url:",url);

        return privateAxios.post(url,data.formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((response) =>{
            if(response&&response.data){
                return response.data;
            }
        }).catch((error) =>{
            console.log(error);
        })
    }


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


const getPostByCategory = async(categoryId) =>{

    try{
        const response = await privateAxios.get(`${baseURL}/category/${categoryId}/posts`);

        if(response && response.data){
            console.log(response.data);
            return response.data;
        }else{
            throw new Error('No response data');
        }

    }catch(error){
        console.error('Error fetching data:',error);
    }

}

const getPostByUser = async(userId) =>{

    try{
        const url = `${baseURL}/user/${userId}/posts`;
        console.log("Requested url:",url);
        const response = await axios.get(url);

        if(response && response.data){
            console.log(response.data);
            return response.data;
        }
        else{
            throw new Error('No response data');
        }
    }catch(error){
        console.log("Error fetching data",error);
    }

}

const deletePostById = async(postId) =>{

    try{
        const url = `${baseURL}/posts/${postId}`;
        console.log("Requested url:"+url);
    
        const response = await privateAxios.delete(url);
    
        if(response&& response.data){
            return response.data;
        }
        else{
            throw new Error('No response data');
        }
    }catch(error){
        console.log("Error fetching data:",error);
    }
}

const updatePost = async(data) =>{
    try{
        const postId=data.postId;
        const url = `${baseURL}/posts/${postId}`;
        console.log("Requested url:",url);

        const response = await privateAxios.put(url,data.post);

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

const uploadPostImage = async(data) =>{

    
    try{
        
        const postId = data.postId;
        const url = `${baseURL}/post/image/upload/${postId}`;
        console.log("Requested url:",url);

        return privateAxios.post(url,data.formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((response) =>{
            if(response&&response.data){
                return response.data;
            }
        }).catch((error) =>{
            console.log(error);
        })

    }catch(error){
        console.log("Error fetching data:",error);
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

const deleteComment = async(userId,postId,commentId) =>{

    try{
        const url = `${baseURL}/user/${userId}/post/${postId}/comments/${commentId}`;
        console.log("Requested url:",url);

        const response = await privateAxios.delete(url);
        if(response && response.data){
            console.log(response.data);
            return response.data;
        }
        else{
            throw new Error("No response data");
        }

    }catch(error){
        console.error('Error fetching posts:', error);
    }
}




export {createPost,getAllPosts,getPostById,getPostByCategory,getPostByUser,deletePostById,updatePost,uploadPostImage,createComment,deleteComment};