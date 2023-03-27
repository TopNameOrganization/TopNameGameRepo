import React, { useState, createContext, useEffect } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

type Theme = 'light' | 'dark'

interface Props {
  children: React.ReactNode
}

interface Context {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<Context>({} as Context)

export const CustomThemeProvider = ({ children }: Props) => {
  const [themeName, setThemeName] = useState<Theme>('light')

  const theme = createTheme({
    palette: {
      mode: themeName,
    },
  })

  useEffect(() => {
    const currentTheme = localStorage.getItem('appTheme')
    if (currentTheme) {
      setThemeName(currentTheme as Theme)
    }
  }, [])

  const handleSetThemeName = (name: Theme) => {
    localStorage.setItem('appTheme', name)
    setThemeName(name)
  }

  const contextValue = {
    theme: themeName,
    setTheme: handleSetThemeName,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useCustomTheme = () => React.useContext(ThemeContext)
