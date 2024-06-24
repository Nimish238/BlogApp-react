import { createContext, useState } from "react";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [profileModal,setProfileModal] = useState(false);
  

  const openProfileModal =()=>{
      setProfileModal(true);
  }

  const closeProfileModal = () =>{
      setProfileModal(false);
  }


  return (
    <AuthContext.Provider value={{ status, setStatus, openProfileModal, closeProfileModal , profileModal}}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;
