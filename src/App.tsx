import { useState } from 'react'

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppLayout from './Layout'


function App() {
const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AppLayout/>
    </QueryClientProvider>
    </>
  )
}

export default App
