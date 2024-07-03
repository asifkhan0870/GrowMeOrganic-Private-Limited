import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FormPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enter Your Details</h2>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormPage;
