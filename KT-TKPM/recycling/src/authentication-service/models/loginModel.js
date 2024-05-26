import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import "../Css/login.css";
import { signInWithEmailAndPassword, signInWithPopup,  GoogleAuthProvider } from "firebase/auth"; //FacebookAuthProvider,
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
  // const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
       
          navigate("/home");
       
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


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxHeight: "100%",
      }}
    >
      <ToastContainer/>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <div>
          <h1>Hello,</h1>
          <h1>Welcome to Recycling</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "300px" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <TextField id="filled-basic" label="Email" variant="filled" /> */}
            <input
              placeholder="Tài khoản"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input-dangnhap"
            />

            <FormControl sx={{ m: 1, width: "300px" }} variant="filled">
              {/* <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel> */}
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginLeft: "50%",
              marginTop: "20%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
              }}
              className="log-container-sign"
              onClick={
                ()=>{
                  navigate("/sign-up")
                }
              }
            >
              Đăng ký tài khoản
            </p>
            <Button variant="contained"
            onClick={()=>{
              handleLogin()
              // toast.success("Đăng nhập thành công")
              // setTimeout(() => {
              //   navigate("/home")
              // }, 2000);
            }}
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
