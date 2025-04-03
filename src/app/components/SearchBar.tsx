'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './SearchBar.module.css'
import { useSearch } from '../context/SearchContext'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { searchTerm, setSearchTerm } = useSearch()
  
  // URL의 쿼리 파라미터 q의 값을 검색창 초기값으로 설정
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
    } else {
      setSearchTerm('')
    }
  }, [searchParams, setSearchTerm])
  
  // 검색 기능 구현
  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }
  
  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>
    </div>
  )
}