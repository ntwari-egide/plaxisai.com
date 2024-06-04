import React from 'react';
import { ReactTyped } from 'react-typed';

interface TypingAnimationProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  backDelay?: number;
  loop?: boolean;
  loopCount?: number;
  showCursor?: boolean;
  cursorChar?: string;
  smartBackspace?: boolean;
  shuffle?: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 50,
  startDelay = 0,
  backDelay = 500,
  loop = true,
  loopCount = 0,
  showCursor = true,
  cursorChar = '|',
  smartBackspace = true,
  shuffle = false,
}) => {
  return (
    <ReactTyped
      strings={strings}
      typeSpeed={typeSpeed}
      backSpeed={backSpeed}
      startDelay={startDelay}
      backDelay={backDelay}
      loop={loop}
      loopCount={loopCount}
      showCursor={showCursor}
      cursorChar={cursorChar}
      smartBackspace={smartBackspace}
      shuffle={shuffle}
    />
  );
};

export default TypingAnimation;
