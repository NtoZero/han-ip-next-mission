'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

// Context 타입 정의
type SearchContextType = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

// Context 생성
const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Context Provider 컴포넌트
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

// Context 사용을 위한 Hook
export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}