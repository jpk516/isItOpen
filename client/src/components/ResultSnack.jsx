import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ResultSnack({ message, severity, open, onClose}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        if (onClose) {
            onClose();
        }
      };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          { message }
        </Alert>
      </Snackbar>
    );
}

export default ResultSnack;