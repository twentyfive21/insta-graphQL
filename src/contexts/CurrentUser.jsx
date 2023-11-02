import { createContext, useState, useEffect } from "react";
import { GET_ALL_USER_POSTS } from "../utils/subscriptions";
import { useSubscription } from "@apollo/client";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  // state for post modal
  const [modalIsOpen, setIsOpen] = useState(false);
  // state for settings modal 
  const [isOpen, setSettings] = useState(false)
  // state for delete post modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false) 
  // Initialize user and currentUser from local storage, if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : false;
  });

  const { data } = useSubscription(GET_ALL_USER_POSTS);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    return storedCurrentUser ? JSON.parse(storedCurrentUser) : {
      id: '',
      email: '',
      avatar: '',
      username: '',
    };
  });

  // Update local storage whenever user or currentUser changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser, currentUser, setCurrentUser, isOpen, setSettings, modalIsOpen, setIsOpen, isDeleteOpen, setIsDeleteOpen, data}}>
      {props.children}
    </UserContext.Provider>
  );
}
