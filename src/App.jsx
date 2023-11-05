import "./App.css";
import Homepage from "../src/pages/Homepage/Homepage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserLogin from "./pages/UserLogin/UserLogin";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserSignUp from "./pages/UserSignUp/UserSignUp";
import UserContextProvider from "./contexts/CurrentUser";
import CommentsContextProvider from "./contexts/CommentData";
import PostContextProvider from "./contexts/PostContext";
import LikesContextProvider from "./contexts/LikesContext";

function App() {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <CommentsContextProvider>
          <LikesContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="/sign-up" element={<UserSignUp />} />
                <Route
                  path="/feed"
                  element={<Homepage />}
                />
                <Route path="/profile-page/:userid" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          </LikesContextProvider>
        </CommentsContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
