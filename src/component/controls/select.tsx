import { Select } from 'antd';
import { RiArrowDownLine } from 'react-icons/ri';

type ReusableSelectProps = {
  defaultValue?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  width?: number;
  allowMultiple?: boolean;
};

const ReusableSelect = ({
  defaultValue,
  placeholder,
  width,
  options,
  className,
  allowMultiple,
}: ReusableSelectProps) => {
  return (
    <div>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{ width: width }}
        className={'alliance-2' + className}
        suffixIcon={<RiArrowDownLine className='text-white' />}
        options={options}
        popupMatchSelectWidth={false}
        allowClear
        mode={ allowMultiple ? 'multiple' : undefined}

      />
    </div>
  );
};

export default ReusableSelect;
