import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme => theme.spacing(4),
});

const StyledPaper = styled(Paper)({
  padding: theme => theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: theme => theme.spacing(1),
});

const StyledButton = styled(Button)({
  marginTop: theme => theme.spacing(2),
});

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    alert(`You entered: ${inputValue}`);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); 
    alert(`You entered: ${inputValue}`);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5">Simple React UI</Typography>
        <StyledForm onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="inputValue"
            label="Enter something"
            name="inputValue"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Show Alert
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default App;
