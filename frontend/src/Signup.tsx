import { useState } from "react";

type Props = {
  setView: (view: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<{ id: number; isAdmin: boolean }>>;
};

type UserFormData = {id: number; name: string; username: string; email: string; password: string;isAdmin: boolean;};

function Signup({ setView, setIsLoggedIn, setCurrentUser }: Props) {
  
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UserFormData>({id: 0, name: "", username: "", email: "", password: "", isAdmin: false});

  // On every input change, call setFormData accordingly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target;
    let newValue: string | number | boolean;

    if (type === "checkbox") newValue = checked
    else if (type === "number") newValue = Number(value)
    else newValue = value;
    setFormData(prev => ({...prev, [name]: newValue}));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send sign up credentials to /users/signup
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // If there is no problem, create the user, login and turn back to posts page
      if (response.ok && result.success) {
        setCurrentUser({id: result.user.id, isAdmin: result.user.isAdmin});
        setIsLoggedIn(true);
        setView("posts");
      } else {
        // If username or email already exist, setError message, it will be shown under the submit button
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
};


  return (
    <main style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center", paddingBottom: "15vh"}}>
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "90%", maxWidth: "500px"}}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required/>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required/>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange}/>
          Is Admin
        </label>
        <button className="form-button" type="submit">Submit</button>
        {error && <p style={{color: "red"}}>{error}</p>}
      </form>
    </main>
  );
}

export default Signup;
