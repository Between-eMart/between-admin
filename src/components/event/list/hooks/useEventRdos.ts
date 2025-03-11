import { useState } from 'react';
import { mockEventList } from './mock-event-list';

export const useEventRdos = () => {
  //
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const [events, setEvents] = useState(() => mockEventList
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    ));

  const totalPages = Math.ceil(events.length / usersPerPage);

  const applyFilters = (filters) => {
    //
    setEvents(prevState => {
      //
      if (filters.statuses.length > 0) {
        prevState = prevState.filter((event) =>
          filters.statuses.some((interest) => event.status.includes(interest)),
        );
      }

      return prevState;
    });
  };

  const clearFilters = () => {
    //
    setEvents(mockEventList);
  };


  return {
    search,
    setSearch,
    page,
    setPage,
    paginatedEvents: events.slice((page - 1) * usersPerPage, page * usersPerPage),
    totalPages,
    applyFilters,
    clearFilters,
  };
};
