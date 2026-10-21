import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types.ts";
import diariesService from "./services/diariesService.ts";
import DiariesList from "./component/DiariesList.tsx";
import DiaryForm from "./component/DiaryForm.tsx";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diariesService.getDiaries().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const handleAddDiary = (newEntry: DiaryEntry) => {
    setDiaries((prevDiaries) => prevDiaries.concat(newEntry));
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm onAddDiary={handleAddDiary} />
      <DiariesList diaries={diaries} />
    </div>
  );
}

export default App;