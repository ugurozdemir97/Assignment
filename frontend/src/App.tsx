import { useState } from "react";
import Header from "./header/Header";
import Footer from "./header/Footer";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import User from "./pages/User";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// Main App
function App() {

    // Login/logout | We can get logged in info from backend instead of hard coding it like this
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ id: number; isAdmin: boolean }>({id: 1,isAdmin: false,});

    // To show different pages depending on which button we click. Default is posts page
    const [view, setView] = useState("posts");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // If a user is selected, show only his posts

    // What will be shown in the home page is determined by "view"
    const renderMain = () => {
        switch (view) {
            case "posts":
                return (
                    <Posts
                        setSelectedUserId={setSelectedUserId}
                        setView={setView}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser}
                    />
                );
            case "users":
                return (
                    <Users
                        setSelectedUserId={setSelectedUserId}
                        setView={setView}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser}
                    />
                );
            case "user":
                return selectedUserId !== null ? (
                    <User
                        userId={selectedUserId}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser}
                        setView={setView}
                    />
                ) : (
                    <></>
                );
            case "login":
                return (
                    <Login
                        setView={setView}
                        setIsLoggedIn={setIsLoggedIn}
                        setCurrentUser={setCurrentUser}
                    />
                );
            case "signup":
                return (
                    <Signup
                        setView={setView}
                        setIsLoggedIn={setIsLoggedIn}
                        setCurrentUser={setCurrentUser}
                    />
                );
            default:
                return <></>;
        }
    };

    // All components together
    return (
        <>
            <Header
                setView={setView}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            ></Header>
            {renderMain()}
            <Footer></Footer>
        </>
    );
}

export default App;
