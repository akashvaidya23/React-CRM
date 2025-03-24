import { Link } from 'react-router';
import styles from './Login.module.css';
import { login } from '../../auth/user';

const Login = () => {

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const resp = await login(data);
        console.log(resp);
        if(resp.success) {
            alert("Logged in!!");
        } else {
            alert("OOPS!");
        }
    }

    return (
        <>
            <form method="post" onSubmit={loginHandler}>
                <div className={styles.form_group}>
                    <h3>Login</h3>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className={styles.input} type="text" name="email" autoComplete='off' />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input className={styles.input} type="password" name="password" autoComplete='off' />
                    </div>
                    <br />
                    <div className={styles.buttons}>
                        <button className={styles.submitBtn} type="submit">Login</button>
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