import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery, UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AuthAPI, SigninData, SignupData, User } from '../api/AuthApi'

interface Context {
  user: User | null
  signin: UseMutateFunction<
    AxiosResponse<User, any>,
    unknown,
    SigninData,
    unknown
  >
  signup: UseMutateFunction<
    AxiosResponse<User, any>,
    unknown,
    SignupData,
    unknown
  >
  logout: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>
  signinIsLoading: boolean
  signinError: any
  signupIsLoading: boolean
  signupError: any
  logoutIsLoading: boolean
  logoutError: any
}

const AuthContext = createContext<Context>({} as Context)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const { data, error, isFetching, refetch } = useQuery(
    ['user'],
    AuthAPI.read,
    {
      retry: 0,
    }
  )

  useEffect(() => {
    if (data?.data) {
      setUser(data.data)
    }
  }, [data?.data])

  const {
    mutate: signin,
    isLoading: signinIsLoading,
    error: signinError,
  } = useMutation(AuthAPI.signin, {
    onSuccess: ({ data }) => {
      setUser(data)
      navigate('/')
    },
  })

  const {
    mutate: signup,
    isLoading: signupIsLoading,
    error: signupError,
  } = useMutation(AuthAPI.signup, {
    onSuccess: () => {
      refetch()
      navigate('/')
    },
  })

  const {
    mutate: logout,
    isLoading: logoutIsLoading,
    error: logoutError,
  } = useMutation(AuthAPI.logout, {
    onSuccess: () => {
      setUser(null)
      navigate('/login')
    },
  })

  const value = {
    user,
    signin,
    signinIsLoading,
    signinError,
    signup,
    signupIsLoading,
    signupError,
    logout,
    logoutIsLoading,
    logoutError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
