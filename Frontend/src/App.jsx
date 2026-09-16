import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/Protected";
import UnAuthRoutes from "./components/unAuthRoutes";
import Chats from "./pages/Chats";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import NotFound from "./components/notFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<UnAuthRoutes/>}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes/>}>
        
          <Route element={<Home />} >
              <Route path="/chat" element={<Chats />} />
              <Route path="/search" element={<Search />} />
              <Route path="/chat/:chatid" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFound/>} />

        </Route>
      </Routes>
    </>
  );
};

export default App;