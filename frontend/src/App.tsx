import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";
import Users from "./Users";
import User from "./User";

// Main App
function App() {

  const [view, setView] = useState("posts");  // To show different pages depending on which button we click
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);  // If a user is selected, show only his posts

  // If the view is "posts" or "users", send this method:
  // (id: number) => {setSelectedUserId(id); setView("user");} 
  // If we click a post or a user we will setView as "user" and we will call setSelectedUserId
  const renderMain = () => {
    switch (view) {
      case "posts":
        return <Posts onSelectUser={(id: number) => {setSelectedUserId(id); setView("user");}} />;
      case "users":
        return <Users onSelectUser={(id: number) => {setSelectedUserId(id);setView("user");}} />;
      case "user":
        return selectedUserId !== null ? <User userId={selectedUserId} /> : <></>;
      default:
        return <></>;
    }
  };

  // Show header (nav bar and login buttons), posts or users, and the footer
  return (
    <>
      <Header setView={setView}></Header>
      {renderMain()}
      <Footer></Footer>
    </>
  );
}

export default App;
