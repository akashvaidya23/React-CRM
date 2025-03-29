import { useSelector } from "react-redux";
import { getUser } from "../../auth/user";
import { useEffect, useState } from "react";

const Dashboard = () => {
    // const selector = useSelector((state) => state);
    // const [currentUser, setCurrentUser] = useState(null);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             console.log(selector.login);
    //             const user = await getUser(selector.login.user_id);
    //             setCurrentUser(user.user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //         }
    //     };
    //     fetchUser();
    // }, [selector.login.user_id]);
    const [currentUser, setCurrentUser] = useState(null);
    let user_id = localStorage.getItem("user_id");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(user_id);
                setCurrentUser(user.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    return (
        <>
            <h3>Welcome to POS</h3>
            {currentUser ? (
                <p>{`Hello ${currentUser.first_name} ${currentUser.last_name}. Your email is ${currentUser.email}`}</p>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    );
};

export default Dashboard;
