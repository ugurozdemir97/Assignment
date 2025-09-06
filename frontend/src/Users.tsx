import { useEffect, useState } from "react";

type User = {
  id: number;
  isAdmin: boolean;
  name: string;
  username: string;
};

type Props = {onSelectUser: (userId: number) => void};

function Users({onSelectUser}: Props) {
  const [users, setUsers] = useState<User[]>([]);  // Array of User objects

  useEffect(() => {  // Get all users on mount
    fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (  // For each user, add a userCard
    <main>
      {users.map((user) => (
        <div key={user.id} className="userCard">
          <a onClick={() => onSelectUser(user.id)}>
            {user.name} <span style={user.isAdmin ? {color: "#900000ff"} : {color: "gray"}}>@{user.username}</span>
          </a>
        </div>
      ))}
    </main>
  );
}

export default Users;