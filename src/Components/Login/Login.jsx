import { Link, useNavigate } from 'react-router';
import styles from './Login.module.css';
import { login } from '../../auth/user';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../features/user/userSlice';
import { useEffect, useState } from 'react';
import showToast from '../../auth/showToast';
import Toaster from '../Toaster/Toaster';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Login";
    },[]);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if(!data.email || !data.password){
            showToast("Kindly fill the complete form! ", 'error');
            return false;
        }
        setLoading(true);
        const resp = await login(data);
        if(resp.success) {
            dispatch(handleLogin(resp.user));
            if(resp.user.role == "admin" || resp.user.role == "superAdmin"){
                navigate("/dashboard");
            } else {
                navigate("/shop");
            }
        } else {
            showToast(resp.error, 'error');
        }
        setLoading(false);
    }

    return (
        <>
            <Toaster />
            <form method="post" onSubmit={loginHandler}>
                <div className={styles.form_group}>
                    <h3>Login</h3>
                    <br />
                    {loading && <div>Loading...</div>}
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className={styles.input} type="text" name="email" autoComplete='off' placeholder="akash.vaidya@google.it" autoFocus />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input className={styles.input} type="password" name="password" placeholder="12345" autoComplete='off' />
                    </div>
                    <br />
                    <div className={styles.buttons}>
                        <button className={styles.submitBtn} disabled={loading} type="submit">Login</button>
                        <Link to="/signup">
                            <button className={styles.signupBtn}>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;