import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('info');

  function showSuccess(message) {
    setSnackMessage(message);
    setSnackSeverity('success');
    setSnackOpen(true);
  }
  function showError(message) {
    setSnackMessage(message);
    setSnackSeverity('error');
    setSnackOpen(true);
  }

  const handleClose = () => {
    setSnackOpen(false);
  };

  const value = { showSuccess, showError };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={snackSeverity} onClose={handleClose} variant="filled">
          {snackMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
