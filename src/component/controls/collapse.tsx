import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';

type CollapseComponentProps = {
  items: CollapseProps['items'];
};

const CollapseComponent = ({ items }: CollapseComponentProps) => (
  <Collapse
    className='w-[63vw] alliance-2'
    items={items}
    bordered={false}
    defaultActiveKey={['1']}
  />
);

export default CollapseComponent;
