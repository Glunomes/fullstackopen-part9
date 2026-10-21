import type { DiaryEntry } from "../types";

interface DiariesListProps {
  diaries: DiaryEntry[];
}

const DiariesList = ({ diaries }: DiariesListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0.5rem 0" }}>{entry.date}</h3>
          <div>visibility: {entry.visibility}</div>
          <div>weather: {entry.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiariesList;