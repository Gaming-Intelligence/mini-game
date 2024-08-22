import React from 'react'
import Lottie from "react-lottie";
import animationData from '/src/assets/animation1.json';

const Upgrade = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl md:text-3xl font-bold mb-4">Upgrades</h1>
      <div className="flex justify-center mt-20">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    </div>
  )
}

export default Upgrade