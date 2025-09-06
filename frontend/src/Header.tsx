function Header({setView}: any) {

    return (
        <header>
            <nav>
                <div>
                    <img src="/logo.webp" alt="Description" onClick={() => setView("posts")}/>
                    <a onClick={() => setView("posts")}>Posts</a>
                    <a onClick={() => setView("users")}>Users</a>
                </div>
                <div>
                    <a>Login</a>
                </div>
            </nav> 
        </header>
    );
}


export default Header;