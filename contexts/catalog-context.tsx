'use client'

import React, { createContext, useContext } from 'react'
import { House } from '@prisma/client'

interface CatalogContextType {
  items: House[]
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined)

export const CatalogProvider: React.FC<{ items: House[]; children: React.ReactNode }> = ({ 
  items, 
  children 
}) => {
  return (
    <CatalogContext.Provider value={{ items }}>
      {children}
    </CatalogContext.Provider>
  )
}

export const useCatalog = () => {
  const context = useContext(CatalogContext)
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider')
  }
  return context
}