import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { EventTask } from '~/models';
import { useEventMutation } from '~/hooks';
import { useForm } from 'react-hook-form';
import { useDialog } from '~/components';

export const EventTaskList = ({ eventId, tasks }: { eventId: number; tasks: EventTask[] }) => {
  //
  const { alert } = useDialog();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();

  const {
    mutation: { addTasksToEvent, removeEventTask },
  } = useEventMutation();

  const handleAddRow = () => {
    //
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    addTasksToEvent.mutate(
      {
        eventId: eventId,
        eventTaskCdos: [{ ...data, eventId: eventId }],
      },
      {
        onSuccess: async () => {
          //
          setIsOpen(false);
          reset();
        },
      },
    );
  };

  const handleTaskRemoveClick = (id: number) => {
    //
    const confResult = confirm('Do you really want to delete?');
    if (confResult) {
      removeEventTask.mutate(
        {
          taskId: id,
        },
        {
          onSuccess: async () => {
            //
            alert('Task has been removed.');
          },
        },
      );
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell align="center" width={'40%'}>
                  {task.name}
                </TableCell>
                <TableCell align="center" width={'40%'}>
                  {task.description || '--'}
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error" size="small" onClick={() => {
                    handleTaskRemoveClick(task.id);
                  }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center" style={{ padding: 10 }}>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Add New Task
        </Button>
      </Stack>

      <Modal open={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add Event Task
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Name" {...register('name', { required: true })} margin="normal"/>
            <TextField fullWidth label="Description" {...register('description')} margin="normal"/>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={() => {
                setIsOpen(false);
              }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Paper>
  );
};
