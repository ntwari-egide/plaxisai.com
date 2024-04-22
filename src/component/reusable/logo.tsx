type LogoProps = {
  size: 'small' | 'medium' | 'large';
  displayAir?: boolean;
};

const LogoComponent = ({ size, displayAir }: LogoProps) => {
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
        GetHired
        <span className='text-[_orange]'>Hints{displayAir ? ' AI' : ''}</span>
      </h1>
    </div>
  );
};

export default LogoComponent;
