import { useLocation, useNavigate } from 'react-router-dom';
import { EventList } from '~/components';
import { Paper, Tabs } from '@mui/material';
import { EventCategoryList } from '~/components/event-category/list';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

export const IndexPage = () => {
  //
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const routeToDetail = (eventId: string) => {
    //
    navigate(`${pathname}/${eventId}`);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Event" />
        <Tab label="Event Category" />
      </Tabs>

      {value === 0 && <EventList onDetail={routeToDetail}></EventList>}
      {value === 1 && <EventCategoryList />}
    </>
  );
};
