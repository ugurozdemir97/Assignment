import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserProp, PostsAndUsers } from "../types/dataTypes";
import DeleteUser from "../components/DeleteUser";

type Props = PostsAndUsers & {setSelectedUserId: Dispatch<SetStateAction<number | null>>;}

function Users({ setSelectedUserId, setView, isLoggedIn, currentUser }: Props) {
    const [users, setUsers] = useState<UserProp[]>([]); // Array of User objects
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null); // Admin can delete users, keep track of confirmation state

    // Get all users on mount
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Failed to fetch users:", err));
    }, []);

    // For each user, add a userCard
    // If logged in as an admin add DeleteUser Component
    return (
        <main>
            {users.map((user) => (
                <div key={user.id} className="postCard">
                    <a
                        onClick={() => {
                            setSelectedUserId(user.id);
                            setView("user");
                        }}
                    >
                        {user.name}{" "}
                        <span style={user.isAdmin ? { color: "#900000ff" } : { color: "gray" }}>
                            @{user.username}
                        </span>
                    </a>
                    {isLoggedIn && currentUser.isAdmin && user.id !== currentUser.id && (
                        <DeleteUser
                            user={user}
                            confirmDeleteId={confirmDeleteId}
                            setConfirmDeleteId={setConfirmDeleteId}
                            setUsers={setUsers}
                        />
                    )}
                </div>
            ))}
        </main>
    );
}

export default Users;
