import { createContext, use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect( () => {
        if(!user){
            const {data} = axios.get('/profile', {withCredentials:true})
            .then((data) => {
                setUser(data);

            })
            
        }
    }, [])
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }