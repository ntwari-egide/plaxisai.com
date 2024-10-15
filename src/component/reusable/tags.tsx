type TagComponentProps = {
  title?: string;
  description?: string;
  classname?: string;
};

const TagComponent = ({ title, description, classname }: TagComponentProps) => {
  return (
    <div
      className={`flex flex-row gap-[4vw]  px-[1.4vw] rounded-full py-[1vh] ${classname}`}
    >
      <h1 className='whyteInktrap_font text-white  text-[1.6vh] leading-[3.3vh] font-medium'>
        {title}
      </h1>
      <h1 className='text-[#D6E7E7] inter-tight text-[1.6vh] font-normal'>
        {description}
      </h1>
    </div>
  );
};

export default TagComponent;
