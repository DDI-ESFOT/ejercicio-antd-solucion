import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../lib/auth";

const RegisterPage = () => {
  const { register } = useAuth();
  const onFinish = (data) => {
    register(data);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Ingresa tu nombre!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre"
        />
      </Form.Item>

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
          Registrarme
        </Button>
        Or <a href="">Iniciar sesión</a>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
