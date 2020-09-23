import React, { useState } from "react";
import {
  InputNumber,
  Form,
  Button,
  Upload,
  message,
  Select,
  Input,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import {
  PlayCircleTwoTone,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export const JobRequestForm = () => {
  const [fileList, updateFileList] = useState<UploadFile<any>[]>([] as any[]);
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      labelCol={{ md: 8 }}
      wrapperCol={{ md: 16 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      colon={false}
    >
      <Form.Item
        label="PDF file"
        name="filename"
        rules={[{ required: true, message: "Please upload a PDF file!" }]}
      >
        <Upload
          fileList={fileList}
          beforeUpload={(file) => {
            if (file.type !== "application/pdf") {
              message.error(`${file.name} is not a PDF file`);
              return false;
            }
            return true;
          }}
          onChange={(info) => {
            console.log(info.fileList);
            updateFileList(info.fileList.filter((file) => !!file.status));
          }}
        >
          <Button icon={<UploadOutlined />}>Upload your document</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Color mode" name="colorMode">
        <Select
          defaultValue="BLACK"
          // onChange={handleChange}
        >
          <Option value="BLACK">Black {"&"} White</Option>
          <Option value="COLOR">Color</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Page range" name="pageRange">
        <Input placeholder="1, 3, [5-9]" />
      </Form.Item>

      <Form.Item label="Copies" name="copyNum">
        <InputNumber min={1} defaultValue={1} />
      </Form.Item>

      <Form.Item label={<PlayCircleTwoTone />}>
        <Button type="primary" htmlType="submit">
          <PrinterOutlined />
          Print!
        </Button>
      </Form.Item>
    </Form>
  );
};
