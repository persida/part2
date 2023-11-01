const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ parts }) => {

const total = parts.reduce((sum, part) => sum + part.exercises, 0);

return <strong>total of {total} exercises</strong>
}

const Part = ({ partName, partExercises }) => 
  <p>
    {partName} {partExercises}
  </p>

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} partName={part.name} partExercises={part.exercises}/>)
}
  

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;