import { Link } from "react-router";
import styles from './Signup.module.css';
import { signUp } from "../../auth/user";

const SignUp = () => {
    const signupHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const resp = await signUp(data, true);
        console.log(resp);
        if(resp.success){
            alert("Wecome")
        } else {
            alert("OOPS!")
        }
    }
    return (
        <>
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