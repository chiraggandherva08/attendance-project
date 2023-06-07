import './App.css';
import React, { useState, useEffect } from 'react';

const fetchData = async (setStudents) => {
  try {
    const response = await fetch("http://localhost:8000/api");
    const jsonData = await response.json();
    setStudents(jsonData);
  } catch (error) {
    setStudents([]);
    console.error('Error: ', error);
  }
}

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = fetchData(setStudents);
  }, []);

  return (
    <div className="App">
      <ul id='student-list'>
        {
          students.map((student, index) => {
            const attendance_percentage = (student.attendance / 30) * 100;

            let bgcolor = 'rgb(68, 83, 255)';
            let fcolor = 'black';

            if (attendance_percentage < 30) { bgcolor = 'rgb(255, 58, 58)' }
            else if (attendance_percentage < 50) { bgcolor = 'rgb(255, 155, 68)' }

            const style = {
              width: `${(student.attendance / 30) * 100}%`,
              background: bgcolor,
              color: fcolor
            }

            return (<li key={index} style={style} className='every-student-attendance-bar'>
              {student.rollNumber} {student.name} {student.attendance}
            </li>)
          })
        }
      </ul>
    </div>
  );
}

export default App;
