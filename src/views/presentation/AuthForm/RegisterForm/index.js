import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { Form, Checkbox } from "antd";
import enhance from "./withForm";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "~/views/presentation/ui/fields";
import { UIButton } from "~/views/presentation/ui/buttons";
import styled from "styled-components";
import strings from "../../../../localization";
import { LOGIN_PATH, REGISTER_COMPLETED_PATH } from "~/configs/routesConfig";

const FormStyled = styled(Form)`
  width: 100%;
  .login   {
    color: #fff;
  }
  .login_anotation {
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
    font-weight: 400;
  }
  div div button:hover {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border: none;
  }
  div div button {
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-style: italic;
    border: none;
  }
  .label {
    display: inline;
  }
  .select {
    display: inline;
    padding: 30px;
  }
  select {
    padding: 8px 20px;
    border-radius: 5px;
  }
`;
const CheckBoxStyled = styled(Checkbox)`
  span:last-child {
    color: #fff;
    color: #fff;
    font-size: 13px;
    font-weight: normal;
    font-style: italic;
  }
`;

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { role: "1" };
  }
  render() {
    const {
      handleSubmit,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      isValid,
      setFieldValue,
      isSubmitting,
      history,
    } = this.props;
    const handleChangeRole = (event) => {
      this.setState({ role: event.target.value });
      if (this.state.role === "1") {
        values.role = ["ROLE_ADMIN"];
      }else if(this.state.role === "2"){
        values.role = ["ROLE_USER"];
      }else values.role = ["ROLE_PM"];
    };
    return (
      <FormStyled onFinish={handleSubmit}>
        <h3 className="login">{strings.register}</h3>
        <p className="login_anotation mb-5">{strings.register_anotation}</p>
        <InputField
          validatestatus={
            touched.fullname && errors.fullname ? "error" : undefined
          }
          help={touched.fullname && errors.fullname ? errors.fullname : ""}
          name="fullname"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={strings.full_name}
        />
        <InputField
          validatestatus={
            touched.username && errors.username ? "error" : undefined
          }
          help={touched.username && errors.username ? errors.username : ""}
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={strings.username}
        />
        <InputField
          validatestatus={touched.email && errors.email ? "error" : undefined}
          help={touched.email && errors.email ? errors.email : ""}
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={strings.email_or_phone}
        />
        <InputField
          validatestatus={
            touched.password && errors.password ? "error" : undefined
          }
          help={touched.password && errors.password ? errors.password : ""}
          name="password"
          type="password"
          iconEnd="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={strings.password}
        />
        <InputField
          validatestatus={
            touched.reenterPasword && errors.reenterPasword
              ? "error"
              : undefined
          }
          help={
            touched.reenterPasword && errors.reenterPasword
              ? errors.reenterPasword
              : ""
          }
          name="reenterPasword"
          type="password"
          iconEnd="password"
          value={values.reenterPasword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={strings.reenter_password}
        />
        <div>
          <div className="label">
            <label>Loại tài khoản: </label>
          </div>
          <div className="select">
            <select value={this.state.role} onChange={handleChangeRole}>
              <option value="1">Admin</option>
              <option value="2">User</option>
              <option value="3">Pm</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <CheckBoxStyled
            value={values.termAgree}
            onChange={() => {
              setFieldValue("termAgree", !values.termAgree);
            }}
          >
            {strings.agree_agriSys_term}
          </CheckBoxStyled>
        </div>
        <Row type="flex" align="middle" className="mt-4">
          <Col>
            <UIButton
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={!(values.termAgree && isValid)}
            >
              <span>{strings.register}</span>
            </UIButton>
          </Col>
        </Row>
        <Row type="flex" className="mt-3">
          <Col>
            <button
              className="btn btn-link mx-0 px-0"
              type="button"
              onClick={() => {
                history.push(LOGIN_PATH);
              }}
            >
              {strings.login_with_your_account}
            </button>
          </Col>
        </Row>
      </FormStyled>
    );
  }
}

export default enhance(RegisterForm);
