type LogoProps = {
  size: 'small' | 'medium' | 'large';
};

const LogoComponent = ({ size }: LogoProps) => {
  return (
    <div>
      <h1
        className={`${
          size === 'small'
            ? 'text-2xl'
            : size === 'medium'
            ? 'text-[3vh]'
            : 'text-5xl'
        } text-white`}
      >
        GetHired<span className='text-[_orange]'>Hints</span>
      </h1>
    </div>
  );
};

export default LogoComponent;
