import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserProp, PostProp, PostsAndUsers } from "../types/dataTypes";
import NewPost from "../components/NewPost";
import DeletePost from "../components/DeletePost";

type Props = PostsAndUsers & {setSelectedUserId: Dispatch<SetStateAction<number | null>>;}

function Posts({ setSelectedUserId, setView, isLoggedIn, currentUser }: Props) {
    const [posts, setPosts] = useState<PostProp[]>([]);
    const [users, setUsers] = useState<UserProp[]>([]);

    // Render all posts on mount
    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Failed to fetch posts:", err));

        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Failed to fetch users:", err));
    }, []);

    // Get the username from id
    const getUsername = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        return user?.username || `user${userId}`;
    };

    // Get if the user is admin or not, this is for rendering edit/delete buttons
    const getStatus = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        return user?.isAdmin || false;
    };

    // This is to keep track of if the user confirmed deleting a post or not
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    // For each post, create a postCard and add it. Show NewPost component if logged in
    // If logged in and the post is your own post, or you are an admin, render DeletePost component
    return (
        <main>
            {isLoggedIn && <NewPost currentUser={currentUser} setPosts={setPosts} />}

            {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="postCard">
                        <a onClick={() => {setSelectedUserId(post.userId); setView("user");}}
                            style={getStatus(post.userId) ? { color: "#900000ff" } : { color: "black" }}>
                            @{getUsername(post.userId)}
                        </a>
                        <div>
                            <p style={{ fontWeight: "700" }}>{post.title}</p>
                            <p>{post.postContext}</p>
                            {isLoggedIn &&
                                (currentUser.id === post.userId || currentUser.isAdmin) && (
                                    <DeletePost
                                        post={post}
                                        confirmDeleteId={confirmDeleteId}
                                        setConfirmDeleteId={setConfirmDeleteId}
                                        setPosts={setPosts}
                                    />
                                )}
                        </div>
                    </div>
                ))}
        </main>
    );
}

export default Posts;
