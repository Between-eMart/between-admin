import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggleButton(props: IconButtonOwnProps) {
  //
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const resolvedMode = (mode === 'system' ? systemMode : mode) as 'light' | 'dark';

  const toggleMode = () => {
    setMode(resolvedMode === 'light' ? 'dark' : 'light');
  };

  const icon = resolvedMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />;

  return (
    <IconButton
      onClick={toggleMode}
      aria-label="toggle color mode"
      size="small"
      {...props}
    >
      {icon}
    </IconButton>
  );
}
