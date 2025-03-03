import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', path: '/dashboard', icon: <HomeRoundedIcon/> },
  { text: 'My Events', path: '/my-events', icon: <EventRoundedIcon/> },
  { text: 'Connections', path: '/connections', icon: <HubRoundedIcon/> },
];

export default function MenuContent() {
  //
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
