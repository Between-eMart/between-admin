import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '~/context';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  //
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormInputs>({ mode: 'onBlur' });
  const { login } = useAuth();

  const onSubmit = (data: LoginFormInputs) => {
    //
    login(data.username, data.password);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 10 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" textAlign="center">Admin Login</Typography>
      <TextField
        fullWidth
        label="Username"
        {...register('username', { required: 'Username is required' })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
      />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
}
