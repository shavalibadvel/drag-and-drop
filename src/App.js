import React, { useState } from 'react';
import './App.css';

function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Required to allow dropping
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Create a copy of the array
    const newDigits = [...digits];
    
    // Remove the dragged item
    const [draggedItem] = newDigits.splice(draggedIndex, 1);
    
    // Insert it at the new drop location (shifting others, not swapping)
    newDigits.splice(dropIndex, 0, draggedItem);

    setDigits(newDigits);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="app-container">
      <h1 className="title">Drag & Drop Digits</h1>
      <p className="subtitle">Drag the boxes to reorder the digits 0–9.</p>

      <div className="board">
        {digits.map((digit, index) => {
          let cellClass = "cell";
          if (index === draggedIndex) cellClass += " dragging";
          if (index === dragOverIndex) cellClass += " drag-over";

          return (
            <div
              key={digit} // Use digit as key for smooth React reconciliation
              className={cellClass}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              {digit}
            </div>
          );
        })}
      </div>

      <p className="tip">
        Tip: Try reordering to make <span className="code">0123456789</span> or reverse it!
      </p>
    </div>
  );
}

export default App;