import { createContext, useState } from "react";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  
  const [status, setStatus] = useState(false);
  const [name,setName] = useState();

  return (
    <AuthContext.Provider value={{ name, setName, status, setStatus}}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;
