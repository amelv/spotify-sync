import * as React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@mui/material';

export interface ConfirmationDialogRawProps {
  open: boolean;
  type: 'save' | 'delete'
  onCancel: () => void;
  onContinue: () => void;
}

export const ConfirmationDialog = ({open, type, onCancel, onContinue}: ConfirmationDialogRawProps) => (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
            {`Are you sure you want to ${type}?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color="primary" autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button  variant='contained' color={type === 'save' ? 'success' : 'error'} onClick={onContinue}>{type.toLocaleUpperCase()}</Button>
      </DialogActions>
    </Dialog>
  );