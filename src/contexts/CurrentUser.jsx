import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  // state for post to be deleted 
  const [deletedPost, setDeletedPost] = useState({});
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
    <UserContext.Provider value={{ user, setUser, currentUser, setCurrentUser, isOpen, setSettings, modalIsOpen, setIsOpen, isDeleteOpen, setIsDeleteOpen, deletedPost, setDeletedPost}}>
      {props.children}
    </UserContext.Provider>
  );
}
