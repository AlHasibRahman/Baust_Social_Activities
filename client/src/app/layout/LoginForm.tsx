import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
  onLogin: (data: { name: string; email: string }) => void;
  onClose: () => void;
};

export default function LoginForm({ onLogin, onClose }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email')?.toString() || 'demo@example.com';
    const password = data.get('password')?.toString() || '';
    onLogin({ name: email.split('@')[0], email });
  };

  return (
    <Paper
      elevation={12}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        p: 4,
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        zIndex: 1000,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
          Close
        </Button>
      </Box>
    </Paper>
  );
}
