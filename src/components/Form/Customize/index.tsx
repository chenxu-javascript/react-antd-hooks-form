import React, { Fragment } from 'react'
interface IProps {
    dom: React.ReactNode;
    [propsName: string]: any;
}

const Customize: React.FC<IProps> = props => {
  const { dom } = props;
  return <Fragment>{dom}</Fragment>;
};

export default Customize;