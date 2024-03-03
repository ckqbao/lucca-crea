import React from 'react';

import BgImg from '../../assets/images/bg-login-2.jpg';

const BackgroundImg = () => {
  return (
    <div className="landing-img">
      <img
        src={BgImg}
        alt="Background"
        style={{ width: '100%', objectFit: 'cover', height: '100%' }}
      />
    </div>
  );
};

export default BackgroundImg;
