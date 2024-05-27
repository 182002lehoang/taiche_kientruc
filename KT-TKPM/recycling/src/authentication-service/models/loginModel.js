import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import "../Css/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import {
  Button,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginModel = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const db = getFirestore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "user", user.uid));
        // navigate("/home");
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin") {
            navigate("/home");
          } else if (userData.role === "user") {
            navigate("/home1");
          } else {
            alert("Invalid role. Please contact support.");
          }
        } else {
          alert("User document does not exist. Please contact support.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        if (error.code === "auth/user-not-found") {
          alert("Sai email. Vui lòng kiểm tra lại.");
        } else if (error.code === "auth/wrong-password") {
          alert("Sai mật khẩu. Vui lòng kiểm tra lại.");
        } else {
          alert("Đăng nhập không thành công do sai email hoặc mật khẩu. Vui lòng thử lại.");
        }
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content">
        <div>
          <h1>Đăng nhập</h1>
          
        </div>
        <div className="login-form">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "300px" },
            }}
            noValidate
            autoComplete="off"
          >
            <input
              placeholder="Tài khoản"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input-dangnhap"
            />
            <FormControl sx={{ m: 1, width: "300px" }} variant="filled">
              <input
                placeholder="Mật khẩu"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="input-dangnhap"
              />
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <div className="login-actions">
            <p
              className="log-container-sign"
              onClick={() => navigate("/sign-up")}
            >
              Đăng ký tài khoản
            </p>
            <Button
              variant="contained"
              onClick={handleLogin}
            >
              <TrendingFlatIcon fontSize="large" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModel;
