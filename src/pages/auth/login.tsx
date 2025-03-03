import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

type LoginFormInputs = {
  phone: string;
  password: string;
};

export const LoginPage = () => {
  //
  const {
    enqueueSnackbar,
  } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    //
    const { password } = data;

    if (password == 'admin1234') {
      window.sessionStorage.setItem('access_token', 'mock_token_123');
      window.location.href = '/dashboard';
    } else {
      enqueueSnackbar('Invalid Credentials', { variant: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', p: 4, mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Phone Number"
          type="tel"
          margin="normal"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: 'Enter a valid phone number (10-15 digits)',
            },
          })}
          inputMode="numeric"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Paper>
  );
};
