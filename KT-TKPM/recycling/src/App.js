
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginModel from "./authentication-service/models/loginModel";
import SignModel from "./authentication-service/models/signModel";
import HomeModel from "./authentication-service/models/homeModel";
import HomeModel1 from "./authentication-service/models/homeModel1";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginModel />}/>
        <Route path="/sign-up" element={<SignModel />}/>
        <Route path="/home" element={<HomeModel />}/>
        <Route path="/home1" element={<HomeModel1 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
