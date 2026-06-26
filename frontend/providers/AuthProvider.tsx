"use client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/store/authSlice"
import { axiosInstance } from "@/utils/axiosInstance"
import { ApiRoutes } from "@/utils/apiRoutes"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const [isRestoring, setIsRestoring] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await axiosInstance.post(ApiRoutes.AUTH.REFRESH_TOKEN)
        dispatch(setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user
        }))
      } catch {
      } finally {
        setIsRestoring(false)
      }
    }

    restoreSession()
  }, [dispatch])

  if (isRestoring) return null

  return <>{children}</>
}