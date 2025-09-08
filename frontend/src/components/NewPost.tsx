import { useState } from "react";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import type { PostProp } from "../types/dataTypes";

type Props = {
    currentUser: { id: number; isAdmin: boolean };
    setPosts: Dispatch<SetStateAction<PostProp[]>>;
};

function NewPost({ currentUser, setPosts }: Props) {
    
    // Title and context of the post
    const [title, setTitle] = useState("");
    const [postContext, setPostContext] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !postContext.trim()) return; // Don't post if its only blank spaces

        // Send create post request to /posts
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: currentUser.id, title, postContext }),
            });

            const result = await response.json();

            // If there is no problem, add the new post and clear text area/input
            if (response.ok && result.success) {
                setPosts((prev) => [...prev, result.post]);
                setTitle("");
                setPostContext("");
            }
        } catch (err) {
            console.log(err);
            console.log("Something went wrong.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="new-post">
            <p>Create New Post</p>
            <input
                maxLength={100}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                maxLength={1000}
                placeholder="What's on your mind?"
                value={postContext}
                onChange={(e) => setPostContext(e.target.value)}
                rows={5}
                required
            />
            <button className="form-button" type="submit">
                Post
            </button>
        </form>
    );
}

export default NewPost;
