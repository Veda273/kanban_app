import React from 'react';
import Card from './Card';

const predefinedStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];

const Board = ({ tickets, groupBy, sortBy, users }) => {
  const groupTickets = (tickets) => {
    const grouped = {};

    if (groupBy === 'status') {
      // Initialize each status with an empty array
      predefinedStatuses.forEach(status => {
        grouped[status] = [];
      });
    }

    tickets.forEach(ticket => {
      let key;

      if (groupBy === 'status') {
        key = ticket.status || '&#xf05e;Canceled';  // Group by status
      } else if (groupBy === 'user') {
        key = users[ticket.userId]?.name || 'Unassigned';  // Group by userId with fallback
      } else if (groupBy === 'priority') {
        key = getPriorityLabel(ticket.priority);  // Group by priority
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    return grouped;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      case 0: return 'No priority';
      default: return 'Unknown';
    }
  };

  const sortedTickets = (groupedTickets) => {
    for (const key in groupedTickets) {
      groupedTickets[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupTickets(tickets);
  const sortedGroupedTickets = sortedTickets(groupedTickets);

  return (
    <div className="board">
      {Object.entries(sortedGroupedTickets).map(([key, group]) => (
        <div key={key} className="column">
          <div className="column-header">
            <h2>{key} ({group.length})</h2>
          </div>
          {group.length > 0 ? (
            group.map(ticket => (
              <Card key={ticket.id} ticket={ticket} groupBy={groupBy} user={users[ticket.userId]} />
            ))
          ) : (
            <p className="empty-column"></p>  // Show message for empty columns
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
