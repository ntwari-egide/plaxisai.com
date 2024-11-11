// pages/auth/google/callback.tsx (if using Next.js)
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
