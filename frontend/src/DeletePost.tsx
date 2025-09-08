import { useState } from "react";
import type { Dispatch, SetStateAction, FormEvent } from "react";

type Post = {
    id: number;
    userId: number;
    title: string;
    postContext: string;
};

type Props = {
    post: Post;
    confirmDeleteId: number | null;
    setConfirmDeleteId: Dispatch<SetStateAction<number | null>>;
    setPosts: Dispatch<SetStateAction<Post[]>>;
};

function DeletePost({ post, confirmDeleteId, setConfirmDeleteId, setPosts }: Props) {
    // These are for editing the post
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedContext, setEditedContext] = useState(post.postContext);

    // Edit post
    const handleEditSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editedTitle.trim() || !editedContext.trim()) return; // Don't post if its only blank spaces

        // Send edit post request to /posts/:id
        try {
            const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editedTitle, postContext: editedContext }),
            });

            const result = await response.json();

            if (response.ok && result) {
                setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, title: editedTitle, postContext: editedContext } : p));
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Edit failed", err);
        }
    };

    // Reset editing
    function resetEditing() {
        setIsEditing(false);
        setEditedTitle(post.title);
        setEditedContext(post.postContext);
    }

    // Delete post
    const handleConfirmDelete = async (id: number) => {
        // Send delete request to the backend
        try {
            await fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" });
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setConfirmDeleteId(null);
        }
    };

    return (
        <div className="edit-buttons">
            <button className="icon-button" onClick={() => setIsEditing((prev) => !prev)}>
                <img src="/pen.svg" alt="Edit" className="icon" />
            </button>

            <button className="icon-button" onClick={() => setConfirmDeleteId(post.id)}>
                <img src="/trash.svg" alt="Delete" className="icon" />
            </button>

            {confirmDeleteId === post.id && (
                <div className="confirm-tooltip">
                    <p>Are you sure you want to delete this post?</p>
                    <div>
                        <button className="form-button" onClick={() => handleConfirmDelete(post.id)}>
                            Yes
                        </button>
                        <button className="form-button" onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isEditing && (
                <form onSubmit={handleEditSubmit} className="edit-form">
                    <input
                        type="text"
                        maxLength={100}
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        required
                    />
                    <textarea
                        maxLength={1000}
                        value={editedContext}
                        onChange={(e) => setEditedContext(e.target.value)}
                        rows={5}
                        required
                    />
                    <div>
                        <button className="form-button" type="submit">
                            Save
                        </button>
                        <button className="form-button" type="button" onClick={resetEditing}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default DeletePost;
