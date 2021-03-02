import React, { useState } from "react";
import { Alert, Button, Form, Input, message, Rate, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { db } from "../firebase";

const NewMovie = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    db.ref("movies").push({
      ...values,
      poster: null,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("El fomulario contiene errores");
    setHasErrors(true);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      {hasErrors && (
        <Alert
          message="Error Text"
          description="Error Description Error Description Error Description Error Description Error Description Error Description"
          type="error"
          closable
          onClose={() => setHasErrors(false)}
        />
      )}

      <Form
        {...layout}
        name="basic"
        // initialValues={}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: "Ingrese el título" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Autor"
          name="author"
          rules={[{ required: true, message: "Ingrese el autor" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="rate" label="Rating">
          <Rate />
        </Form.Item>

        <Form.Item
          name="poster"
          label="Poster"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewMovie;
