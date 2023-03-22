import React, { useState, useRef, useEffect } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

import { useCustomTheme } from '../context/ThemeProvider'
import animation from '../assets/themeSwitch.json'

export const ThemeSwitch = () => {
  const [blocked, setBlocked] = useState(false)
  const { theme, setTheme } = useCustomTheme()
  const player = useRef<LottieRefCurrentProps>(null)

  const click = () => {
    if (!blocked) {
      player.current?.setDirection(theme == 'light' ? 1 : -1)
      player.current?.play()
    }
  }

  useEffect(() => {
    const frame = theme === 'light' ? 0 : 10
    player.current?.goToAndStop(frame, true)

    return () => player.current?.destroy()
  }, [])

  return (
    <div>
      <Lottie
        lottieRef={player}
        onClick={click}
        animationData={animation}
        loop={false}
        initialSegment={[0, 10]}
        onSegmentStart={() => {
          setBlocked(true)
        }}
        onComplete={() => {
          setBlocked(false)
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
        style={{ width: '40px', height: '40px', marginRight: '16px' }}></Lottie>
    </div>
  )
}
