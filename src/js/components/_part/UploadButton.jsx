import { FileUploadOutlined } from '@mui/icons-material';
import { Alert, Button, Snackbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function UploadButton(props) {
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleClose = (e, r) => {
    if (r === 'clickaway') {
      return;
    }

    setShowError(false);
    setShowSuccess(false);
  };

  const handleFileChosen = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadstart = () => {
      setShowError(false);
      setShowSuccess(false);
    };

    fileReader.onloadend = (e) => {
      try {
        const { onUpload } = props;
        const json = JSON.parse(e.target.result);

        setTimeout(() => onUpload(json), 500);
        setShowSuccess(true);
      } catch {
        setShowError(true);
      }
    };

    fileReader.readAsText(file);
  };

  return (
    <>
      <Button className="upload-button" component="label">
        <input
          hidden
          accept="application/json"
          type="file"
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
        <FileUploadOutlined className="upload-button-icon" />
      </Button>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          JSON successfully loaded
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Not a valid JSON
        </Alert>
      </Snackbar>
    </>
  );
}

UploadButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
