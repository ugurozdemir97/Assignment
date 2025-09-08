import { useState } from "react";
import type { FormEvent } from "react";
import type { LoginProp } from "../types/dataTypes";

function Login({ setView, setIsLoggedIn, setCurrentUser }: LoginProp) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Send login credentials to /users/login
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            // If the username and password is correct, log in and go back to posts
            if (response.ok && result.success) {
                setCurrentUser({ id: result.user.id, isAdmin: result.user.isAdmin });
                setIsLoggedIn(true);
                setView("posts");
            } else {
                // If username doesn't exist or password is wrong setError message, it will be shown under the submit button
                setError(result.message || "Login failed");
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong.");
        }
    };

    // Login form
    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "15vh",
            }}
        >
            <h2>Login</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "90%",
                    maxWidth: "500px",
                }}
            >
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="form-button" type="submit">
                    Log In
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </main>
    );
}

export default Login;
