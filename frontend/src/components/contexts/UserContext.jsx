import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/backendApi";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user", { withCredentials: true });
        console.log("✅ Fetched user data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
        setUser(false); // unauthenticated/guest
      } finally {
        setLoading(false);
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