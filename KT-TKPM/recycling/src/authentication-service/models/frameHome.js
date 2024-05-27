import React, { useState, useEffect } from 'react';
import '../Css/fram.css';
import penel1 from '../../IMG/panel1.png';
import penel2 from '../../IMG/panel2.png';
import penel3 from '../../IMG/panele.png';

function FrameHome() {
  const [currentImage, setCurrentImage] = useState(1); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage === 3 ? 1 : prevImage + 1)); 
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <header>
        <h1>Nhận thức về tái chế thiết bị điện tử</h1>
        <p>Giải pháp bảo vệ môi trường</p>
      </header>

      <div className="image-container">
        {currentImage === 1 && <img src={penel1} style={{width:400,height:400}}  />}
        {currentImage === 2 && <img src={penel2}style={{width:400,height:400}}  />}
        {currentImage === 3 && <img src={penel3} style={{width:400,height:400}}  />}
      </div>

      <footer>
        <p>Thông tin liên hệ:</p>
        <ul>
          <li>Email: admin@gmail.com</li>
          <li>Số điện thoại: 0123 456 789</li>
        </ul>
      </footer>
    </div>
  );
}

export default FrameHome;
