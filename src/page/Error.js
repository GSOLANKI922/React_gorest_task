import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CONSTANT, ROUTERS } from "../constant/Constant";

const Error = () => {
  return (
    <div className="error_container">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to={ROUTERS.HOME}>
            <Button type="primary">{CONSTANT.BACK_TO_HOME}</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Error;
