import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user", {
          withCredentials: true,
        });
        console.log("Fetched user data:", res.data); // Directly log the response
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(false); // means guest
      } finally {
        setLoading(false); // done loading regardless
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
