'use client'

import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

function ReactQueryProvider ({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
