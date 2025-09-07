type User = { id: number; isAdmin: boolean; username: string };

type Props = {
  user: User;
  confirmDeleteId: number | null;
  setConfirmDeleteId: (id: number | null) => void;
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  setView?: (view: string) => void;
  className?: string;
};


function DeleteUser({user, confirmDeleteId, setConfirmDeleteId, setUsers, setView, className}: Props) {

  const handleConfirmDelete = async (id: number) => {
    // If you delete a user, send that request to /users/:id to delete it from server and send it to
    // posts/user/:id for deleting the posts of the user
    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      await fetch(`http://localhost:3000/posts/user/${id}`, { method: "DELETE" });
      if (setUsers) setUsers((prev) => prev.filter((u) => u.id !== id));  // Update users
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
      <button className="icon-button" onClick={() => setConfirmDeleteId(user.id)}>
        <img src="/trash.svg" alt="Delete" className="icon" />
      </button>
      {confirmDeleteId === user.id && (
        <div className="confirm-tooltip">
          <p>Are you sure you want to delete this user?</p>
          <div>
            <button className="form-button" onClick={() => handleConfirmDelete(user.id)}>Yes</button>
            <button className="form-button" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
