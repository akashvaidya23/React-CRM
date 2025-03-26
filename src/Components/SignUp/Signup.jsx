import { Link, useNavigate } from "react-router";
import styles from './Signup.module.css';
import { signUp } from "../../auth/user";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../features/user/userSlice";
import { useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state)
    console.log(user.login);
    useEffect(() => {
        if(user.login.is_logged_in){
            navigate("/dashboard");
        }
    },[user.login, navigate]);
    const signupHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const resp = await signUp(data, true);
        console.log(resp);
        if(resp.success){
            dispatch(handleLogin({id : resp.id}));
            alert("Wecome");
            navigate("/dashboard")
        } else {
            toast.error(resp.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }
    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <div className={styles.form_group}>
            <h3>SignUp</h3>
            <form method="post" onSubmit={signupHandler}>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <br />
                    <input className={styles.input} type="text" name="first_name" autoComplete='off' />
                </div>
                <br />
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <br />
                    <input className={styles.input} type="text" name="last_name" autoComplete='off' />
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input className={styles.input} type="email" name="email" autoComplete='off' />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input className={styles.input} type="password" name="password" autoComplete='off' />
                </div>
                <br />
                <div>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <br />
                    <input className={styles.input} type="password" name="confirm_password" autoComplete='off' />
                </div>
                <br />
                <div className={styles.buttons}>
                    <button className={styles.submitBtn} type="submit">SignUp</button>
                    <Link to="/login">
                        <button className={styles.loginBtn}>Login</button>
                    </Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default SignUp;