import { useEffect, useState } from "react"
import type { DiaryEntry } from './types.ts'
import diariesService from "./services/diariesService.ts"
import DiariesList from "./component/DiariesList.tsx"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diariesService.getDiaries().then(initialDiaries => {
      setDiaries(initialDiaries);
    })
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiariesList diaries={diaries} />
    </div>
  )
}

export default App
