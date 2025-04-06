import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const mainListItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Influencers', path: '/influencers', icon: <PeopleRoundedIcon /> },
  { text: 'Organizations', path: '/organizations', icon: <BusinessCenterRoundedIcon /> },
  { text: 'Events', path: '/events', icon: <EventRoundedIcon /> },
  { text: 'Support', path: '/support', icon: <SupportRoundedIcon /> },
  { text: 'Settings', path: '/settings', icon: <SettingsRoundedIcon /> },
];

export default function MenuContent() {
  //
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === selectedIndex} onClick={() => handleListItemClick(index, item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
