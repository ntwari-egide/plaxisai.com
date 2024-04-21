/**
 * @author: Egide Ntwali
 * @description: The 404 page
 * @returns {JSX.Element} The 404 page
 */

import Seo from '@/component/seo';
import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';


export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <Link className='mt-4 md:text-lg' href='/'>
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
