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
            const attendance_percentage = (student.attendance/30) * 100;

            let bgcolor = 'blue';
            let fcolor = 'white';

            if (attendance_percentage < 30) { bgcolor = 'red' }
            else if (attendance_percentage < 50) { 
              bgcolor = 'yellow'; 
              fcolor = 'black'; 
            }

            const style = {
              width: `${(student.attendance/30) * 100}%`,
              height: '40px',
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
