import React, { useState } from "react";
import "../Css/home.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import FrameHome from "./frameHome";
import FormPhone from "./formPhone";
import AdminPage from "./adminPage";

function HomeModel() {
  const [current, setCurrent] = useState(1);

  const handleClickSetColor = (index) => {
    setCurrent(index);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="user-info">
          <img
            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            alt="img-user"
            className="user-avatar"
          />
          <p className="username">user</p>
        </div>
        <ul className="menu">
          <li
            className={`menu-item ${current === 1 ? "selected" : ""}`}
            onClick={() => handleClickSetColor(1)}
          >
            <HomeOutlinedIcon fontSize="large" />
            <p>Trang chủ</p>
          </li>
          <li
            className={`menu-item ${current === 2 ? "selected" : ""}`}
            onClick={() => handleClickSetColor(2)}
          >
            <AutoGraphOutlinedIcon fontSize="large" />
            <p>Sản phẩm tái chế</p>
          </li>
          {/* <li
            className={`menu-item ${current === 3 ? "selected" : ""}`}
            onClick={() => handleClickSetColor(3)}
          >
            <RecyclingOutlinedIcon fontSize="large" />
            <p>Thiết bị tái chế</p>
          </li> */}
          {/* <li
            className={`menu-item ${current === 4 ? "selected" : ""}`}
            onClick={() => handleClickSetColor(4)}
          >
            <GradingOutlinedIcon fontSize="large" />
            <p>Phản hồi đánh giá</p>
          </li> */}
        </ul>
      </div>
      <div className="content">
        {current === 1 && <FrameHome />}
        {/* {current === 2 && <AdminPage />} */}
        {current === 2 && <FormPhone />}
        {/* {current === 4 && (
          <div>
            <h2>Phản hồi đánh giá</h2>
            <p>Nội dung của Phản hồi đánh giá</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default HomeModel;
