/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import { motion, Variants } from 'framer-motion';
import * as React from 'react';
import { RefObject, useEffect, useState } from 'react';

import AIPipelineComponent from '@/component/home/ai-pipeline';
import CallToActionComponent from '@/component/home/call-to-action';
import FAQComponent from '@/component/home/faq';
import HomeWelcomeComponent from '@/component/home/welcome';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

// Variants for animation
const componentVariants: Variants = {
  offscreen: {
    // y: 100 // Initial state offscreen
  },
  onscreen: {
    y: 0, // Final position onscreen
    rotate: 0, // Rotate to 0 degrees for simplicity, adjust as needed
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function HomePage() {
  const ref = React.useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <motion.div
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true, amount: 0.8 }}
        className='welcome-bg flex justify-between flex-col'
      >
        <HeaderLayout />
        {/* Each HomeWelcomeComponent with the same animation, if intended */}
        <motion.div variants={componentVariants}>
          <HomeWelcomeComponent />
        </motion.div>
        <motion.div
          ref={ref}
          style={{ x, y }}
          className='absolute top-0 left-0 w-10 h-10 bg-red-500 rounded-full'
        ></motion.div>
        <AIPipelineComponent />
        <FAQComponent />
        <CallToActionComponent />
        <FooterComponent />
      </motion.div>
    </div>
  );
}

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      const x = clientX - element.offsetLeft - element.offsetWidth / 2;
      const y = clientY - element.offsetTop - element.offsetHeight / 2;
      setPoint({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return point;
}
