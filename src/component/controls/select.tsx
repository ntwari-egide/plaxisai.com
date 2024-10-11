import { Select } from 'antd';
import { RiArrowDownLine } from 'react-icons/ri';

type ReusableSelectProps = {
  defaultValue?: string[];
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  width?: number;
  allowMultiple?: boolean;
  onChange?: (value: string[]) => void;
};
 
const ReusableSelect = ({
  defaultValue,
  placeholder,
  width,
  options,
  className,
  allowMultiple,
  onChange,
}: ReusableSelectProps) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: width }}
        className={'alliance-2' + className}
        suffixIcon={<RiArrowDownLine className='text-[#000000]' />}
        options={options}
        popupMatchSelectWidth={false}
        defaultValue={defaultValue}
        mode={allowMultiple ? 'multiple' : undefined}
      />
    </div>
  );
};

export default ReusableSelect;
