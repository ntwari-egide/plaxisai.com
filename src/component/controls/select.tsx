import { ArrowDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';

type ReusableSelectProps = {
  defaultValue?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  width?: number;
};

const ReusableSelect = ({
  defaultValue,
  placeholder,
  width,
  options,
  className,
}: ReusableSelectProps) => {
  return (
    <div>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{ width: width }}
        className={'alliance-2' + className}
        suffixIcon={<ArrowDownOutlined />}
        options={options}
        popupMatchSelectWidth={false}
      />
    </div>
  );
};

export default ReusableSelect;
