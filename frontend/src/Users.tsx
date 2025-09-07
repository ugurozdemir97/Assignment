import { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";

type User = { id: number; isAdmin: boolean; name: string; username: string };

type Props = {
  onSelectUser: (userId: number) => void;
  isLoggedIn: boolean;
  currentUser: { id: number; isAdmin: boolean };
};

function Users({ onSelectUser, isLoggedIn, currentUser }: Props) {

  const [users, setUsers] = useState<User[]>([]);  // Array of User objects
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);  // Admin can delete users, keep track of confirmation state

  // Get all users on mount
  useEffect(() => {
    fetch("http://localhost:3000/users")
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
          <a onClick={() => onSelectUser(user.id)}>
            {user.name}{" "}
            <span style={user.isAdmin ? { color: "#900000ff" } : { color: "gray" }}>
              @{user.username}
            </span>
          </a>
          {isLoggedIn && currentUser.isAdmin && user.id !== currentUser.id && (
            <DeleteUser user={user} confirmDeleteId={confirmDeleteId} setConfirmDeleteId={setConfirmDeleteId} setUsers={setUsers}/>
          )}
        </div>
      ))}
    </main>
  );
}

export default Users;
