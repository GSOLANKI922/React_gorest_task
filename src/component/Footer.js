import React from "react";
import { HeartFilled, createFromIconfontCN } from "@ant-design/icons";
import "../styles/global.css";
import { Layout } from "antd";
import { CONSTANT } from "../constant/Constant";
const { Footer } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const CommonFooter = () => {
  return (
    <Footer className="footer_component">
      <div>{CONSTANT.COOKIE}</div>
      <div>
        {CONSTANT.COPY_RIGHT} &#169;  {CONSTANT.MADE} <HeartFilled /> {CONSTANT.FORM}
      </div>
      <div className="icon">
        <IconFont type="icon-facebook" className="icon" />
        <IconFont type="icon-twitter" className="icon" />
      </div>
    </Footer>
  );
};

export default CommonFooter;
