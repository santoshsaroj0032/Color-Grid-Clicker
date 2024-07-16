import React, { useState } from 'react';
import './App.css';  
 
const App = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill('white')));
  const [clicks, setClicks] = useState([]);
  const [allClicked, setAllClicked] = useState(false);

  const handleClick = (row, col) => {
    if (allClicked) return;

    const newMatrix = matrix.map((matrixRow, r) =>
      matrixRow.map((color, c) =>
        r === row && c === col ? 'green' : color
      )
    );

    setMatrix(newMatrix);
    setClicks([...clicks, { row, col }]);

    if (clicks.length === 8) {
      setAllClicked(true);
      setTimeout(() => {
        changeToOrangeInSequence();
      }, 500);
    }
  };

  const changeToOrangeInSequence = () => {
    clicks.forEach((click, index) => {
      setTimeout(() => {
        setMatrix(prevMatrix =>
          prevMatrix.map((matrixRow, r) =>
            matrixRow.map((color, c) =>
              r === click.row && c === click.col ? 'orange' : color
            )
          )
        );
      }, index * 500);
    });
  };

  return (
    <div className="container">
      {/* <Navbar /> */}
      <div className="grid">
        {matrix.map((row, r) =>
          row.map((color, c) => (
            <div
              key={`${r}-${c}`}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(r, c)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
