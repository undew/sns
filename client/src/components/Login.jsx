import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Login({ open, handleClose, log }) {
  const [email, setName] = React.useState('');
  const [pass, setPass] = React.useState('');
  const handleName = (e) => setName(e.target.value);
  const handlePass = (e) => setPass(e.target.value);

  const handleClick = () => {
    const array = { email: email, pass: pass };
    console.log(0);
    fetch("/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(array)
    }).then(res => res.json())
      .then(data => {
        handleClose();
        log();
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleName}
          />
          <TextField
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={pass}
            onChange={handlePass}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
