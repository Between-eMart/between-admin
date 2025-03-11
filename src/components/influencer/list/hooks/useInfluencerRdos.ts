import { useState } from 'react';
import { mockInfluencerList } from './mock-influencer-list';

export const useInfluencerRdos = (isRequest: boolean) => {
  //
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const [influencers, setInfluencers] = useState(() => mockInfluencerList
    .filter(influencer => !isRequest ? influencer.status != 'Request' : influencer.status == 'Request')
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    ));

  const totalPages = Math.ceil(influencers.length / usersPerPage);

  const applyFilters = (filters) => {
    //
    setInfluencers(prevState => {
      //
      if (filters.gender) {
        prevState = prevState.filter((user) => user.gender === filters.gender);
      }
      if (filters.interests.length > 0) {
        prevState = prevState.filter((user) =>
          filters.interests.some((interest) => user.interests.includes(interest)),
        );
      }

      return prevState;
    });
  };

  const clearFilters = () => {
    //
    setInfluencers(mockInfluencerList);
  };


  return {
    search,
    setSearch,
    page,
    setPage,
    paginatedInfluencers: influencers.slice((page - 1) * usersPerPage, page * usersPerPage),
    totalPages,
    applyFilters,
    clearFilters,
  };
};
