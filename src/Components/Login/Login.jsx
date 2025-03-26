import { Link, useNavigate } from 'react-router';
import styles from './Login.module.css';
import { login } from '../../auth/user';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../features/user/userSlice';
import { useEffect, useState } from 'react';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state)
    console.log(user.login);
    useEffect(() => {
        if(user.login.is_logged_in){
            navigate("/dashboard");
        }
    },[user.login, navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const resp = await login(data);
        console.log(resp);
        if(resp.success) {
            setLoading(false);
            dispatch(handleLogin({id : resp.id}));
            navigate("/dashboard")
        } else {
            setLoading(false);
            alert(resp.error);
        }
    }

    return (
        <>
            <form method="post" onSubmit={loginHandler}>
                <div className={styles.form_group}>
                    <h3>Login</h3>
                    <br />
                    {loading && <div>Loading...</div>}
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className={styles.input} type="text" name="email" autoComplete='off' autoFocus />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input className={styles.input} type="password" name="password" autoComplete='off' />
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