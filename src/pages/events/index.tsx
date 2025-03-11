import { useLocation, useNavigate } from 'react-router-dom';
import { EventList } from '~/components';

export const IndexPage = () => {
  //
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const routeToDetail = (eventId: string) => {
    //
    navigate(`${pathname}/${eventId}`);
  };
  return (
    <EventList
      onDetail={routeToDetail}
    />
  );
};
