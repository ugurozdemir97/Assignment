import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import DeletePost from "./DeletePost";

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

type Props = {
  onSelectUser: (userId: number) => void;
  isLoggedIn: boolean;
  currentUser: {id: number; isAdmin: boolean};
};

function Posts({ onSelectUser, isLoggedIn, currentUser }: Props) {

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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
  }

  // This is to keep track of if the user confirmed deleting a post or not
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // For each post, create a postCard and add it. Show NewPost component if logged in
  // If logged in and the post is your own post, or you are an admin, render DeletePost component
  return (  
    <main>

      {(isLoggedIn) && (
        <NewPost currentUser={currentUser} setPosts={setPosts} />
      )}

      {posts.slice().reverse().map((post) => (
        <div key={post.id} className="postCard">
          <a onClick={() => onSelectUser(post.userId)} style={getStatus(post.userId) ? { color: "#900000ff" } : { color: "black" }}>@{getUsername(post.userId)}</a>
          <div>
            <p style={{ fontWeight: "700" }}>{post.title}</p>
            <p>{post.postContext}</p>
            {(isLoggedIn && (currentUser.id === post.userId || currentUser.isAdmin)) && (
              <DeletePost post={post} confirmDeleteId={confirmDeleteId} setConfirmDeleteId={setConfirmDeleteId} setPosts={setPosts}/>
            )}
          </div>
        </div>
      ))}

    </main>
  );
}

export default Posts;