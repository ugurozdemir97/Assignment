import { useEffect, useState } from "react";
import type { UserProp, PostProp, PostsAndUsers } from "../types/dataTypes";
import DeletePost from "../components/DeletePost";
import NewPost from "../components/NewPost";
import DeleteUser from "../components/DeleteUser";

type Props = PostsAndUsers & {userId: number;}

function User({ userId, isLoggedIn, currentUser, setView }: Props) {
    const [userPosts, setUserPosts] = useState<PostProp[]>([]);
    const [theUser, setUser] = useState<UserProp | null>(null);

    useEffect(() => {
        // Fetch posts of the user
        fetch(`${import.meta.env.VITE_API_URL}/posts/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUserPosts(data);
            })
            .catch((err) => console.error("Failed to fetch posts:", err));

        // Fetch username
        fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            })
            .catch((err) => console.error("Failed to fetch user:", err));
    }, [userId]);

    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const [confirmDeleteUser, setConfirmDeleteUser] = useState<number | null>(null);

    // If the user profile and the logged in user is the same, render NewPost component
    return (
        <main>
            {theUser && (
                <p style={{ fontWeight: "700", fontSize: "20px", margin: "20px 0 0 20px" }}>
                    Posts by @{theUser.username}
                </p>
            )}

            {theUser && isLoggedIn && currentUser.isAdmin && userId !== currentUser.id && (
                <DeleteUser
                    className="delete-user-button"
                    user={theUser}
                    confirmDeleteId={confirmDeleteUser}
                    setConfirmDeleteId={setConfirmDeleteUser}
                    setUser={setUser}
                    setView={setView}
                />
            )}

            {isLoggedIn && currentUser.id === userId && (
                <NewPost currentUser={currentUser} setPosts={setUserPosts} />
            )}

            {userPosts.slice().reverse().map((post) => (
                <div key={post.id} className="postCard">
                    {theUser && (
                        <a style={theUser.isAdmin ? { color: "#900000ff" } : { color: "black" }}>
                                @{theUser.username}
                        </a>
                    )}
                    <div>
                        <p style={{ fontWeight: "700" }}>{post.title}</p>
                        <p>{post.postContext}</p>
                        {isLoggedIn &&
                                theUser &&
                                (currentUser.id === theUser.id || currentUser.isAdmin) && (
                            <DeletePost
                                post={post}
                                confirmDeleteId={confirmDeleteId}
                                setConfirmDeleteId={setConfirmDeleteId}
                                setPosts={setUserPosts}
                            />
                        )}
                    </div>
                </div>
            ))}
        </main>
    );
}

export default User;
