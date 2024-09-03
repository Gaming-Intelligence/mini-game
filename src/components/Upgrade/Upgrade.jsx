import React from 'react'
import Lottie from "react-lottie";
import animationData from '/src/assets/animation5.json';

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
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow mt-20">Upgrades</h1>
      <div className="flex justify-center mt-15">
        <Lottie options={defaultOptions} height={420} width={420} />
      </div>
    </div>
  )
}

export default Upgrade