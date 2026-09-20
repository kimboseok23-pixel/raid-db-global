'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [champions, setChampions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChampions() {
      const { data, error } = await supabase.from('champions').select('*')
      if (error) {
        // 에러의 상세 메시지를 정확하게 출력하도록 변경
        console.error('Data fetch error message:', error.message)
        console.error('Data fetch error details:', error.details)
        console.error('Full error object:', JSON.stringify(error, null, 2))
      } else {
        setChampions(data)
      }
      setLoading(false)
    }

    fetchChampions()
  }, [])

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-amber-400">
          RAID: Shadow Legends 챔피언 DB
        </h1>

        {loading ? (
          <p className="text-slate-400">데이터를 불러오는 중입니다...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {champions.map((champ) => (
              <div
                key={champ.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-slate-100">
                    {champ.name_kr} <span className="text-sm text-slate-400">({champ.name_en})</span>
                  </h2>
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-semibold">
                    {champ.rarity}
                  </span>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>속성: {champ.affinity}</p>
                  <p>역할: {champ.role}</p>
                  <p>클랜보스 티어: {champ.cb_tier}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}