'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField, Container, Box, CircularProgress, Typography
} from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import ProtectedRoute from '../components/ProtectedRoute';
import { fetchPosts } from '../utils/api';
import { logout } from '../utils/auth';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.id.toString().includes(search)
    );
    setFilteredPosts(filtered);
    setPage(0);
  }, [search, posts]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex' }}>
        <Header onLogout={handleLogout} />
        <Sidebar />
        <Container sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ mt: 8 }}>
            <TextField
              label="Search by title or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              margin="normal"
            />
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <DataTable
                posts={filteredPosts}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                search={search}
              />
            )}
          </Box>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}