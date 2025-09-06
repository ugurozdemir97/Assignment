import { useEffect, useState } from "react";

type Post = {
  id: number;
  userId: number;
  title: string;
  postContext: string;
};

type User = {
  id: number;
  isAdmin: boolean;
  username: string;
};

type Props = {onSelectUser: (userId: number) => void};

function Posts({ onSelectUser }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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


  const getUsername = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.username || `user${userId}`;
  };

  const getStatus = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.isAdmin || false;
  }

  return (  // For each post, create a postCard and add it
    <main>
      {posts.slice().reverse().map((post) => (

        <div key={post.id} className="postCard">
          <a onClick={() => onSelectUser(post.userId)} style={getStatus(post.userId) ? {color: "#900000ff"} : {color: "black"}}>
            @{getUsername(post.userId)}
          </a>
          <div>
            <p style={{ fontWeight: "700" }}>{post.title}</p>
            <p>{post.postContext}</p>
          </div>
        </div>
        
      ))}
    </main>
  );
}

export default Posts;