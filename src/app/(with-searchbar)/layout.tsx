'use client'

import SearchBar from '@/app/components/SearchBar'
import { SearchProvider } from '@/app/context/SearchContext'

export default function SearchbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SearchProvider>
      <div>
        <SearchBar />
        {children}
      </div>
    </SearchProvider>
  )
}