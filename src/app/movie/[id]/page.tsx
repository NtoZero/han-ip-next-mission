'use client'

import { useParams } from 'next/navigation'

export default function MovieDetail() {
  const params = useParams()
  const id = params.id
  
  return (
    <div>
      <div>movie : {id}</div>
    </div>
  )
}
