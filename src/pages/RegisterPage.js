import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
  Upload,
} from "antd";
import { LockOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../lib/auth";
import { Link } from "react-router-dom";
import withoutAuth from "../hocs/withoutAuth";
import translateMessage from "../utils/translateMessage";

const { Title } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (data) => {
    setLoading(true);
    try {
      console.log("FORM data", data);
      let photo = null;
      if (data.photo) {
        photo = data.photo[0].originFileObj;
      }

      await register({
        ...data,
        photo,
      });
      setLoading(false);
    } catch (error) {
      const errorCode = error.code;
      message.error(translateMessage(errorCode));
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 30 }}>
      <Col span={12}>
        <Row justify="center">
          <Col>
            <Title>Crear una cuenta</Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="photo"
                label="Foto"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Selecciona un archivo .jpg"
              >
                <Upload name="logo" action={null} listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

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
                name="lastname"
                rules={[{ required: true, message: "Ingresa tu apellido" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Apellido"
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Clave"
                />
              </Form.Item>

              <Form.Item
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Debes confirmar tu clave",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las claves no coinciden")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirmar clave"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Registrarme
                </Button>
                O <Link href="">Iniciar sesión</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withoutAuth(RegisterPage);
