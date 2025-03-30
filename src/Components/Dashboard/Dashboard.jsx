import { getUser } from "../../auth/user";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    let userId = localStorage.getItem("user_id");
    useEffect(() => {
        document.title = "Dashboard";
    },[]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(userId);
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
                <p>{`Hello ${currentUser.first_name}. Your email is ${currentUser.email}`}</p>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    );
};

export default Dashboard;