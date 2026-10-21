import { useState, type SyntheticEvent } from "react";
import axios from "axios";
import { Weather, Visibility, type DiaryEntry, type NewDiaryEntry } from "../types";
import diariesService from "../services/diariesService";

interface DiaryFormProps {
  onAddDiary: (entry: DiaryEntry) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [date, setDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addNewDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      ...(comment.trim() ? { comment: comment.trim() } : {}),
    };

    try {
      const createdEntry = await diariesService.addNewDiary(newDiary);
      onAddDiary(createdEntry);
      setDate("");
      setComment("");
      setWeather(Weather.Cloudy);
      setVisibility(Visibility.Good);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(String(error.response.data));
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={addNewDiary}>
        <div>
          <label htmlFor="date">date </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </div>

        <div>
          <span>visibility </span>
          {(Object.values(Visibility) as Visibility[]).map((val) => (
            <label key={val} style={{ marginRight: "0.5rem" }}>
              <input
                type="radio"
                name="visibility"
                value={val}
                checked={visibility === val}
                onChange={() => setVisibility(val)}
              />
              {val}
            </label>
          ))}
        </div>

        <div>
          <span>weather </span>
          {(Object.values(Weather) as Weather[]).map((val) => (
            <label key={val} style={{ marginRight: "0.5rem" }}>
              <input
                type="radio"
                name="weather"
                value={val}
                checked={weather === val}
                onChange={() => setWeather(val)}
              />
              {val}
            </label>
          ))}
        </div>

        <div>
          <label htmlFor="comment">comment </label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;