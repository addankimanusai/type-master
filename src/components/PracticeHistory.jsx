import React from 'react';
import { getHistory, clearHistory } from '../utils/storage';
import { MdDelete } from 'react-icons/md';

function PracticeHistory({ refreshTrigger }) {
  const history = getHistory();
  const [localHistory, setLocalHistory] = React.useState(history);

  React.useEffect(() => {
    setLocalHistory(getHistory());
  }, [refreshTrigger]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your practice history?')) {
      clearHistory();
      setLocalHistory([]);
    }
  };

  if (localHistory.length === 0) {
    return null;
  }

  return (
    <div className="practice-history">
      <div className="history-header">
        <h3>Practice History</h3>
        <button onClick={handleClear} className="clear-btn" aria-label="Clear History">
          <MdDelete /> Clear
        </button>
      </div>
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Keys</th>
              <th>Accuracy</th>
              <th>WPM</th>
            </tr>
          </thead>
          <tbody>
            {localHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.keysPressed}</td>
                <td>{item.accuracy}%</td>
                <td>{item.wpm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PracticeHistory;
