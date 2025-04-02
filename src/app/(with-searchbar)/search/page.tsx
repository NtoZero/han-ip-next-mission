'use client'

import { useSearchParams } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || '이정환'
  
  return (
    <div>
      <div>Search : {query}</div>
      <div>서치 페이지 (~/search?q={query})</div>
    </div>
  )
}
