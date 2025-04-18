import axios from 'axios';
import Cookies from 'js-cookie'

const signUp = async (data, is_login) => {
    try {
        const response = await axios({
            method: "post",
            url: `http://localhost:8000/api/users`,
            data: data,
        });
        console.log(response);
        if (response.status == 200) {
            if (is_login) {
                localStorage.setItem("user_id", response.data.token);
            }
            return { status: response.status, success: true, message: 'User created successfully', user: response.data.user }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        let message = err.response?.data?.message || err.message;
        return { status: 500, message: 'Something went wrong', error: message }
    }
};

const login = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `http://localhost:8000/api/users/login`,
            data: data,
            withCredentials: true
        });
        // console.log(response.data.data.accessToken);
        const resp = response.data.data.loggedInUser;
        // console.log(resp);
        // console.log(Cookies.get());
        if (response.status == 200) {
            localStorage.setItem("user_id", response.data.data.accessToken);
            return { status: response.status, success: true, message: 'Logged in successfully.', user: resp }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        let message = err.response?.data?.message || err.message;
        return { status: 500, message: 'Something went wrong', error: message }
    }
}

const getUser = async (userId) => {
    try {
        const response = await axios({
            method: "get",
            url: `http://localhost:8000/api/users/${userId}`,
        });
        if (response.status == 200) {
            return { status: response.status, success: true, message: 'User fetched successfully', user: response.data.user }
        } else {
            return { status: response.status, success: false, message: 'Something went wrong' }
        }
    } catch (err) {
        let message = err.response?.data?.message || err.message;
        return { status: 500, success: false, message: 'Something went wrong', error: message }
    }
}

const logout = async () => {
    try {
        let response = await axios({
            method: "post",
            url: `http://localhost:8000/api/users/logout`,
            withCredentials: true,
        });
        if (response.statusCode == 200) {
            localStorage.removeItem("user_id");
            return { status: response.statusCode, success: true, message: 'Logged out successfully' }
        }
    } catch (error) {
        console.log(error);
    }
}

export { signUp, login, getUser, logout };