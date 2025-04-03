'use client'

import { useSearch } from '../../context/SearchContext'

export default function Search() {
  const { searchTerm } = useSearch()
  
  return (
    <div>
      <div>Search : {searchTerm}</div>
    </div>
  )
}