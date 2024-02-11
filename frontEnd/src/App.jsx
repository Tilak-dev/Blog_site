import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/header";
import Blog from "./pages/Blog";
import Resister from "./pages/Resister";
import Login from "./pages/Login";

function App() {
   return (
      <>
         <div>
            <Header></Header>
            <Routes>
               <Route path="/" element={<Blog/>} />
               <Route path="/blogs" element={<Blog/>} />
               <Route path="/register" element={<Resister/>} />
               <Route path="/login" element={<Login/>} />
            </Routes>
         </div>
      </>
   );
}

export default App;
