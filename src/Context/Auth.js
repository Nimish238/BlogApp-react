import { createContext, useState } from "react";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  
  const [status, setStatus] = useState(false);

  return (
    <AuthContext.Provider value={{ status, setStatus}}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;
