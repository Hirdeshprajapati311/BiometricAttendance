"use client"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { store } from "@/store/store";



export default function QueryProvider({
  children
}: { children: React.ReactNode }) {


  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}

      </QueryClientProvider>
    </Provider>
  )
}