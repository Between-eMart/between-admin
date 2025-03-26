import { atom, useAtom } from 'jotai';
import { v4 } from 'uuid';
import { useCallback } from 'react';

export interface IDialog {
  id: string;
  type: 'Alert' | 'Confirm';
  message: string | React.ReactNode;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const contextAtom = atom<IDialog[]>([]);

export const useDialog = () => {
  //
  const [_dialog, setDialog] = useAtom(contextAtom);

  const alert = useCallback((message: string | React.ReactNode, onSuccess?: () => void) => {
    setDialog((prev) => [...prev, { id: v4(), type: 'Alert', message, onSuccess }]);
  }, []);

  const confirm = useCallback((message: string | React.ReactNode, onSuccess?: () => void, onCancel?: () => void) => {
    setDialog((prev) => [...prev, { id: v4(), type: 'Confirm', message, onSuccess, onCancel }]);
  }, []);

  return {
    alert,
    confirm,
  };
};
