import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import Routes from "../constants/routes";
import { useAuth } from "../lib/auth";
import withoutAuth from "../hocs/withoutAuth";

const LoginPage = () => {
  const history = useHistory();
  const { login, user } = useAuth();

  useEffect(() => {
    if (!!user) {
      history.replace(Routes.HOME);
    }
  }, [user]);

  const onFinish = ({ email, password }) => {
    login(email, password);
  };

  if (user === null) {
    return "Verificando sesión...";
  }

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Ingresa tu correo electrónico!" },
          {
            type: "email",
            message: "Ingresa un correo válido",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo electrónico"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Ingresa tu clave" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Clave"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Iniciar sesión
        </Button>
        O <Link to={Routes.REGISTER}>Regístrate</Link>
      </Form.Item>
    </Form>
  );
};

export default withoutAuth(LoginPage);
