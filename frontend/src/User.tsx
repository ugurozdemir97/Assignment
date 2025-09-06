import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  postContext: string;
};

type User = {
  id: number;
  isAdmin: boolean;
  username: string;
};

type Props = {userId: number};

function User({userId}: Props) {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [theUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch posts of the user
    fetch(`http://localhost:3000/posts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {setUserPosts(data)})
      .catch((err) => console.error("Failed to fetch posts:", err));

    // Fetch username
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {setUser(data)})
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [userId]);

  return (
    <main>
    {theUser && (
      <p style={{ fontWeight: "700", fontSize: "20px", marginLeft: "20px" }}>
        Posts by @{theUser.username}
      </p>
    )}
    {userPosts.slice().reverse().map((post) => (
      <div key={post.id} className="postCard">
        {theUser && <a style={theUser.isAdmin ? {color: "#900000ff"} : {color: "black"}}>@{theUser.username}</a>}
        <div>
          <p style={{ fontWeight: "700" }}>{post.title}</p>
          <p>{post.postContext}</p>
        </div>
      </div>
    ))}
  </main>

  );
}

export default User;