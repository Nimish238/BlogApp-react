import { createContext, useState } from "react";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [userId,setUserId] = useState(0);

  return (
    <AuthContext.Provider value={{ status, setStatus, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;
