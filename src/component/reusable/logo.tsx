type LogoProps = {
  size: 'small' | 'medium' | 'large';
  displayAI?: boolean;
};

const LogoComponent = ({ size, displayAI }: LogoProps) => {
  return (
    <div className=' flex flex-row object-center items-center gap-[1vw]'>
      {!displayAI && (
        <h1 className='whyteInktrap_font font-semibold text-[2.5vh]'>
          Plaxis AI
        </h1>
      )}
      <div
        className={`${
          size === 'small'
            ? 'text-2xl'
            : size === 'medium'
            ? 'text-[3vh]'
            : 'text-5xl'
        } text-[#000000]`}
      >
        {displayAI ? (
          <h1 className='whyteInktrap_font text-[1.2em] font-bold text-[#09090D]'>
            Plaxis <span className='text-[#F28729]'>AI</span>
          </h1>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default LogoComponent;
