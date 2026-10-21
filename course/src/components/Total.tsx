interface TotalExercise {
  totalExercises: number,
};

const Total = ({ totalExercises }: TotalExercise) => {
  return <p>Number of exercises {totalExercises}</p>
}

export default Total;