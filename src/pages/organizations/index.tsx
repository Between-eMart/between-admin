import { OrganizationList, EstablishmentCategoryList } from '~/components';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

export const IndexPage = () => {
  //
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Organization" />
        <Tab label="Establishment Category" />
      </Tabs>
      {value === 0 && <OrganizationList/>}
      {value === 1 && <EstablishmentCategoryList/>}
    </>
  );
};
