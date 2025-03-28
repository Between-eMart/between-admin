import { useNavigate, useParams } from 'react-router-dom';
import { EventDetail } from '~/components';

export const EventDetailPage = () => {
  //
  const { eventId } = useParams();
  const navigate = useNavigate();

  const routeBack = () => {
    //
    navigate(-1);
  };

  return (
    <EventDetail
      eventId={eventId ? Number.parseInt(eventId) : 0}
      onBack={routeBack}
    />
  );
};
