import React, { useState, createContext, useEffect } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useAuth } from './AuthContext'
import { useMutation, useQuery } from 'react-query'
import { ThemeAPI } from '../api/ThemeApi'

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
  const { user } = useAuth()
  const [themeName, setThemeName] = useState<Theme>('light')

  const { data: themeData, refetch: refetchTheme } = useQuery(
    ['theme', user.data?.id],
    () => ThemeAPI.getTheme({ userId: user.data?.id ?? undefined }),
    {
      retry: 0,
      enabled: !!user.data?.id,
    }
  )

  const { mutate: changeTheme } = useMutation(
    (theme: Theme) =>
      ThemeAPI.addTheme({
        id: themeData?.data.id,
        userId: user.data?.id as number,
        theme,
      }),
    {
      onSuccess: () => {
        refetchTheme()
      },
    }
  )

  const theme = createTheme({
    palette: {
      mode: themeName,
    },
  })

  useEffect(() => {
    if (themeData?.data.theme) {
      setThemeName(themeData?.data.theme)
    }
  }, [themeData?.data.theme])

  const handleSetThemeName = (name: Theme) => {
    changeTheme(name)
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
