import {useState} from "react";
import {mockInfluencerList} from "~/components/influencer/hooks/mock-influencer-list";

export const useInfluencerRdos = (isRequest: boolean) => {
  //
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;


  const filteredInfluencers = mockInfluencerList
    .filter(influencer => !isRequest ? influencer.status != 'Request' : influencer.status == 'Request')
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );

  const totalPages = Math.ceil(filteredInfluencers.length / usersPerPage);
  const paginatedInfluencers = filteredInfluencers.slice((page - 1) * usersPerPage, page * usersPerPage);


  return {
    search,
    setSearch,
    page,
    setPage,
    paginatedInfluencers,
    totalPages,
  }
}
