import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import {menu} from './Assetss/icons/3 dot menu.svg'

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);

      const usersMap = data.users.reduce((acc, user) => {
        acc[user.id] = { name: user.name, available: user.available };
        return acc;
      }, {});
      setUsers(usersMap);
    };
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app-container">
      <div className="display">
        <button onClick={toggleDropdown} className="dropdown-button">Display &#9662;</button>
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown-item">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
     

      {/* Pass tickets and users to the Board component */}
      <Board tickets={tickets} groupBy={grouping} sortBy={ordering} users={users} />
    </div>
  );
};

export default App;
