import React from 'react'
import Lottie from 'lottie-react'
import animation from '../assets/themeSwitch.json'

export const ThemeSwitch = () => {
  //   const options = {
  //     // loop: true,
  //     // autoplay: true,
  //     animationData: animation,
  //     rendererSettings: {
  //       preserveAspectRatio: 'xMidYMid slice',
  //     },
  //   }
  return (
    <div>
      <Lottie
        animationData={animation}
        // autoplay={false}
        // loop={false}
        // initialSegment={[0, 10]}
        style={{ width: '40px', height: '40px' }}></Lottie>
    </div>
  )
}
