import firebase from "firebase";
import React, { useContext,useState, useEffect } from "react";
import { useHistory } from "react-router-dom";



const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          setUser(user);
          setIsLoading(false);
          if(user) history.push("/chats");
        })
    }, [user, history]);

    const value = {user}

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}

        </AuthContext.Provider>
    );
}
