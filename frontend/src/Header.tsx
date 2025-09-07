
type Props = {
  setView: (view: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  isLoggedIn: boolean;
};

function Header({setView, setIsLoggedIn, isLoggedIn}: Props) {

    // If logged in, render Logout button. If not logged in, render Login and Sign Up
    return (
        <header>
            <nav>
                <div>
                    <img src="/logo.webp" alt="Description" onClick={() => setView("posts")}/>
                    <a onClick={() => setView("posts")}>Posts</a>
                    <a onClick={() => setView("users")}>Users</a>
                </div>
                <div>
                    {!isLoggedIn ? (
                        <>
                            <a onClick={() => setView("login")}>Login</a>
                            <a onClick={() => setView("signup")}>Sign Up</a>
                        </>
                        ) : (
                            <a onClick={() => {setIsLoggedIn(false); setView("posts")}} >Logout</a>
                        )}
                </div>
            </nav> 
        </header>
    );
}


export default Header;