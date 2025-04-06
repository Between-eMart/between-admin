import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom, IDialog } from '~/components';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export const CustomDialog = () => {
  //
  const [dialogs, setDialogs] = useAtom(contextAtom);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    if (ids.some((id) => dialogs.find((value) => value.id === id))) {
      setDialogs(dialogs.filter((value) => !ids.includes(value.id)));
    }
  }, [ids]);

  useEffect(() => {
    if (dialogs.length === 0 && ids.length > 0) {
      setIds([]);
    }
  }, [dialogs]);

  const handleClickOk = (dialog: IDialog) => async () => {
    if (dialog.onSuccess) {
      dialog.onSuccess();
    }
    setIds((prev) => [...prev, dialog.id]);
  };

  const handleClickCancel = (dialog: IDialog) => async () => {
    if (dialog.onCancel) {
      dialog.onCancel();
    }
    setIds((prev) => [...prev, dialog.id]);
  };
  return (
    <>
      {dialogs.length > 0 ? (
        <Dialog open={dialogs.length > 0} maxWidth={'xs'} fullWidth>
          {dialogs.map((value) =>
            value.type === 'Alert' ? (
              <React.Fragment key={value.id}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                  {typeof value.message === 'string' ? (
                    <Typography variant={'body1'}>{value.message}</Typography>
                  ) : (
                    value.message
                  )}
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClickOk(value)}>OK</Button>
                </DialogActions>
              </React.Fragment>
            ) : (
              <React.Fragment key={value.id}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                  {typeof value.message === 'string' ? (
                    <Typography variant={'body1'}>{value.message}</Typography>
                  ) : (
                    value.message
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickCancel(value)}>Cancel</Button>
                  <Button autoFocus onClick={handleClickOk(value)}>OK</Button>{' '}
                </DialogActions>
              </React.Fragment>
            ),
          )}
        </Dialog>
      ) : null}
    </>
  );
};

export default React.memo(CustomDialog);
