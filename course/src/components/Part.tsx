import type { CoursePart } from "./Content";

const NotCheckedKindProject = (course: never) : never => {
  throw new Error(`Unhandled union member of course parts: ${JSON.stringify(course)}`)
}

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map(course => { 
        switch(course.kind) {
          case("basic"): return( 
            <div>
              <h3>{course.name} {course.exerciseCount}</h3> 
              <i>{course.description}</i>
            </div>)
          case("group"): return(
            <div>
              <h3>{course.name} {course.exerciseCount}</h3> 
              <p>project exercieses: {course.groupProjectCount}</p>
            </div>)
          case("background"): return(
            <div>
              <h3>{course.name} {course.exerciseCount}</h3>
              <i>{course.description}</i>
              <p>submit to {course.backgroundMaterial}</p>
            </div>)
          case("special"): return(
            <div>
              <h3>{course.name} {course.exerciseCount}</h3>
              <i>{course.description}</i>  
              <p>required skill: {course.requirements.join(', ')}</p>
            </div>)
          default:
            return NotCheckedKindProject(course);
        }
      })}
    </>
  )
};

export default Part;