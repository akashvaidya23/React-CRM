import axios from 'axios';

const signUp = async (data, is_login) => {
    try {
        const response = await axios({
            method: "post",
            url: `http://localhost:8002/api/users`,
            data: data,
        });
        if(response.status == 201) {
            if(is_login){
                localStorage.setItem("user_id", response.data.token);
            }
            return { status: response.status, success: true, message : 'User created successfully', user : response.data.user }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err){
        let message = err.response?.data?.message || err.message;
        return { status: 500, message : 'Something went wrong', error: message }
    }
};

const login = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `http://localhost:8002/api/users/login`,
            data: data,
        });
        console.log(response);
        
        if(response.status == 201) {
            localStorage.setItem("user_id", response.data.token);
            return { status: response.status, success: true, message : 'Logged in successfully.', user : response.data.user }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        let message = err.response?.data?.message || err.message;
        return { status: 500, message : 'Something went wrong', error: message }
    }
}

const getUser = async (id) => {
    try {
        const response = await axios({
            method: "get",
            url: `http://localhost:8002/api/users/${id}`,
        });
        console.log(response);
        if(response.status == 200) {
            return { status: response.status, success: true, message : 'User fetched successfully', user : response.data.user }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        let message = err.response?.data?.message || err.message;
        return { status: 500, success: false, message : 'Something went wrong', error: message }
    }
}

export {signUp, login, getUser}