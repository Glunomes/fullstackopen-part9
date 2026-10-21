import type { DiaryEntry } from "../types";

interface DiaryList {
  diaries: DiaryEntry[]
}

const DiariesList = (props: DiaryList) => {
  return (
    <div>
      <ul>
        {props.diaries.map(d => (
          <li key={d.id}>
            <p>{d.weather} {d.visibility} {d.date} {d.comment} </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DiariesList;