'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);
  return children;
}