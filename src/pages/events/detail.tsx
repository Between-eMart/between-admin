import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EventDetail } from '~/components';

export const EventDetailPage = () => {
  //
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const routeBack = () => {
    //
    navigate(-1);
  };

  return (
    <EventDetail
      eventId={eventId}
      onBack={routeBack}
    />
  );
};
