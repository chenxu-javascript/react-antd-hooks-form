import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { isArray } from "./../../../utils/utils";
import { IPropsSearch } from "./../interface";
import Form from "./../../Form/Form";
import { useForm, FormContext } from "react-hook-form";
import classnames from "classnames";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import style from "./index.less";

const LIMITSEARCH = 3;
const SearchList = (props: IPropsSearch) => {
  const { conditions, defaultValues, onSearch, is_view, btnStyle, styles, show_more_btn = false } = props;
  if (!isArray(conditions)) {
    console.log("conditions is not array!!");
    return null;
  }

  const methods = useForm({
    defaultValues
  });

  const { getValues, triggerValidation } = methods;
  const [show_more_visible, setShowmore] = useState(false);
  // 搜索
  const handSearch = async () => {
    const resValidation = await triggerValidation();
    const data = getValues({ nest: true });
    console.log("data =>", resValidation, data);
    onSearch(data);
  };
  // 重置
  const handReset = () => {};

  const commonButtons = () => {
    return (
      <Fragment>
        <Button
          type="primary"
          className={style.mr10}
          disabled={is_view}
          onClick={handSearch}
          style={btnStyle}
        >
          查询
        </Button>
        <Button onClick={handReset} disabled={is_view} style={btnStyle}>
          重置
        </Button>
      </Fragment>
    );
  };

  const moreButtons = () => {
    return (
      <Button
        type={!show_more_visible ? undefined : "primary"}
        icon={!show_more_visible ? <DownOutlined /> : <UpOutlined />}
        style={btnStyle}
        className={style.mr10}
        disabled={is_view}
        onClick={() => setShowmore(v => !v)}
      >
        更多
      </Button>
    );
  };
  const is_show_more_btn = show_more_btn && (conditions.length > LIMITSEARCH || conditions.some(l => l.is_high));
  return (
    <FormContext {...methods}>
      <section className={classnames(style["form-search"])} style={styles}>
        <Form
          data={[
            ...conditions,
            {
              input_type: "Customize",
              name: 'Customize',
              dom: (
                <Fragment>
                  {is_show_more_btn && moreButtons()}
                  {commonButtons()}
                </Fragment>
              )
            }
          ]}
        />
      </section>
    </FormContext>
  );
};
export default SearchList;
