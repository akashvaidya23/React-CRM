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
                localStorage.setItem("user_id", response.data.user_id);
            }
            return { status: response.status, success: true, message : 'User created successfully', id : response.data.user_id }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err){
        console.log(err);
        return { status: 500, message : 'Something went wrong', error: err.response.data.message }
    }
};

const login = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `http://localhost:8002/api/users/login`,
            data: data,
        });
        if(response.status == 201) {
            localStorage.setItem("user_id", response.data.user_id);
            return { status: response.status, success: true, message : 'Logged in successfully.', id : response.data.user_id }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        console.log(err);
        return { status: 500, message : 'Something went wrong', error: err.response.data.message }
    }
}

export {signUp, login}