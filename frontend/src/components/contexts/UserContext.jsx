import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/backendApi";
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user", {
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
