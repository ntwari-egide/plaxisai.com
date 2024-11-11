// pages/auth/google/callback.tsx (if using Next.js)
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      // Handle token exchange or login process here
      console.log('Authorization code:', code);
    }
  }, [router]);

  return <div>Processing login...</div>;
}