'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from './utils/auth';
import { useThemeContext } from './context/ThemeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();
  const { theme } = useThemeContext();

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Invalid email format';
      } else {
        delete newErrors.email;
      }
    }
    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      validateField('email', value);
    } else if (name === 'password') {
      setPassword(value);
      validateField('password', value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = 'Invalid email format';
    if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Simulate a login delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const token = login(email, password);
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } catch (error) {
        setErrors({ general: 'Login failed. Please try again.' });
        setIsSubmitting(false);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Fade in={animate} timeout={1000}>
        <Box
          sx={{
            p: 4,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.text.primary }}>
            Login
          </Typography>
          {errors.general && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errors.general}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'scale(1.02)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: theme.palette.background.paper }} />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Box>
      </Fade>
    </Container>
  );
}