import { useState } from 'react';
import { mockOrganizationList } from './mock-organization-list';

export const useOrganizationRdos = () => {
  //
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const [organizations, setOrganizations] = useState(() => mockOrganizationList
    .filter((organization) =>
      organization.name.toLowerCase().includes(search.toLowerCase()),
    ));

  const totalPages = Math.ceil(organizations.length / usersPerPage);

  const applyFilters = (filters) => {
    //
    setOrganizations(prevState => {
      //
      if (filters.categories.length > 0) {
        prevState = prevState.filter((organization) =>
          filters.categories.some((interest) => organization.category == interest),
        );
      }

      return prevState;
    });
  };

  const clearFilters = () => {
    //
    setOrganizations(mockOrganizationList);
  };


  return {
    search,
    setSearch,
    page,
    setPage,
    paginatedOrganizations: organizations.slice((page - 1) * usersPerPage, page * usersPerPage),
    totalPages,
    applyFilters,
    clearFilters,
  };
};
