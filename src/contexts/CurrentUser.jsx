import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props){
    // setting state for query search
const [user, setUser] = useState(false)
const [currentUser, setCurrentUser] = useState({
    id: '',
    email: '',
    avatar: '',
    username: '',
})

return(
  <UserContext.Provider value={{user, setUser, currentUser, setCurrentUser}}>
      {props.children}
  </UserContext.Provider>
  )
}




