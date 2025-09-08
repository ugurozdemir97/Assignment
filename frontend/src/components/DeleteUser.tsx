import { useState } from "react";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import type { UserProp } from "../types/dataTypes";

type Props = {
    user: UserProp;
    confirmDeleteId: number | null;
    setConfirmDeleteId: Dispatch<SetStateAction<number | null>>;
    setUsers?: Dispatch<SetStateAction<UserProp[]>>;
    setUser?: Dispatch<SetStateAction<UserProp | null>>;
    setView?: Dispatch<SetStateAction<string>>;
    className?: string;
};

function DeleteUser({
    user,
    confirmDeleteId,
    setConfirmDeleteId,
    setUsers,
    setUser,
    setView,
    className,
}: Props) {
    // These are for editing the user
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedUsername, setEditedUsername] = useState(user.username);

    // Edit User
    const handleEditSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editedName.trim() || !editedUsername.trim()) return; // Don't post if its only blank spaces

        // Send edit post request to /users/:id
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editedName, username: editedUsername }),
            });

            const result = await response.json();

            if (response.ok && result) {
                if (setUsers) {
                    setUsers((prev) =>
                        prev.map((u) => u.id === user.id ? { ...u, name: editedName, username: editedUsername } : u));
                } else if (setUser) {
                    setUser((prev) => {
                        if (!prev) return null;
                        return { ...prev, name: editedName, username: editedUsername };
                    });
                }
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Edit failed", err);
        }
    };

    // Reset editing
    function resetEditing() {
        setIsEditing(false);
        setEditedName(user.name);
        setEditedUsername(user.username);
    }

    // Delete User
    const handleConfirmDelete = async (id: number) => {
        // If you delete a user, send that request to /users/:id to delete it from server and send it to
        // posts/user/:id for deleting the posts of the user
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, { method: "DELETE" });
            await fetch(`${import.meta.env.VITE_API_URL}/posts/user/${id}`, { method: "DELETE" });
            if (setUsers) setUsers((prev) => prev.filter((u) => u.id !== id)); // Update users
            if (setView) setView("posts");
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setConfirmDeleteId(null);
        }
    };

    // If logged in as an admin this will be rendered
    // A tooltip pop up will be shown if you click delete button
    return (
        <div className={`edit-buttons ${className ? className : ""}`}>
            <button className="icon-button" onClick={() => setIsEditing((prev) => !prev)}>
                <img src="/pen.svg" alt="Edit" className="icon" />
            </button>
            <button className="icon-button" onClick={() => setConfirmDeleteId(user.id)}>
                <img src="/trash.svg" alt="Delete" className="icon" />
            </button>
            {confirmDeleteId === user.id && (
                <div className="confirm-tooltip">
                    <p>Are you sure you want to delete this user?</p>
                    <div>
                        <button className="form-button" onClick={() => handleConfirmDelete(user.id)}>
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
                        maxLength={50}
                        type="text"
                        name="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        maxLength={20}
                        type="text"
                        name="username"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                        placeholder="Username"
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

export default DeleteUser;
