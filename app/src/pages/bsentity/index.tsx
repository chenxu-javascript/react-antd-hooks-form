import React, { Fragment } from "react";
import { DataTable } from 'antd-hooks-form';
// import 'antd-hooks-form/dist/antd-hooks-form.css';
// import Search from "@components/DataTable/Search";
// import Table from "@components/DataTable/Table";
import { getTableColumns } from "./contanst";

const SearchList = [
  {
    label: "表单名称",
    name: "name",
    input_type: "Input"
  },
  {
    label: "选择",
    name: "CheckBox",
    input_type: "CheckBox",
    options: [
      { name: "单层级", id: "LIST" },
      { name: "多层级", id: "TREE" }
    ]
  },
  {
    label: "选择",
    name: "Radio",
    input_type: "Radio",
    options: [
      { name: "单层级", id: "LIST" },
      { name: "多层级", id: "TREE" }
    ]
  },
  {
    label: "日期",
    name: "DatePicker",
    input_type: "DatePicker"
  },
  {
    label: "时间",
    name: "DateTimePicker",
    input_type: "DateTimePicker"
  },
  {
    label: "数字",
    name: "InputNumber",
    input_type: "InputNumber"
  },
  {
    label: "层级类型",
    name: "data_structure",
    input_type: "Select",
    options: [
      { name: "单层级", id: "LIST" },
      { name: "多层级", id: "TREE" }
    ]
  },
  // {
  //   input_type: "Customize",
  //   dom: <div>我是自定义dom数据</div>
  // },
  {
    label: "层级类型",
    name: "data_structure_m",
    input_type: "Select",
    mode: "multiple",
    options: [
      { name: "单层级", id: "LIST" },
      { name: "多层级", id: "TREE" }
    ]
  }
];
const Bsentity = () => {
  const query =  {};
  const onGoToPage = () => {};
  const onSearch = (data: any) => {
    console.log(data);
  };
  const data = [];
  // return (
  //   <Fragment>
  //     <Search conditions={SearchList} defaultValues={query} onSearch={onSearch} />
  //     <Table columns={getTableColumns({ onGoToPage })} dataSource={data} />
  //   </Fragment>
  // );
  return <DataTable conditions={SearchList} columns={getTableColumns({ onGoToPage })} />;
};

export default Bsentity;
