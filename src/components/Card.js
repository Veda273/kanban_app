import React from 'react';

const Card = ({ ticket, groupBy, user }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return '🟥'; // Red for high priority
      case 3:
        return '🟧'; // Orange for medium priority
      case 2:
        return '🟨'; // Yellow for lower priority
      case 1:
        return '🟩'; // Green for lowest priority
      default:
        return '⬜';  // White for no priority
    }
  };

  if (groupBy === 'user') {
    return (
      <div className="card">
        <div className="card-header">
          <span className="ticket-id">{ticket.id}</span>
          {user && <span className="user-name">{user.name}</span>}
        </div>
        <h3 className="card-title">{ticket.title}</h3>
        <div className="card-footer">
          <span className="ticket-tag">{ticket.tag[0]}</span>
        </div>
      </div>
    );
  }

  if (groupBy === 'status') {
    return (
      <div className="card">
        <div className="card-header">
          <span className="ticket-id">{ticket.id}</span>
          <span className="ticket-status">{ticket.status}</span>
        </div>
        <h3 className="card-title">{ticket.title}</h3>
        <div className="card-footer">
          <span className="ticket-tag">{ticket.tag[0]}</span>
        </div>
      </div>
    );
  }

  if (groupBy === 'priority') {
    return (
      <div className="card">
        <div className="card-header">
          <span className="ticket-id">{ticket.id}</span>
          <span className="priority-icon">{getPriorityIcon(ticket.priority)}</span>
        </div>
        <h3 className="card-title">{ticket.title}</h3>
        <div className="card-footer">
          <span className="ticket-tag">{ticket.tag[0]}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
