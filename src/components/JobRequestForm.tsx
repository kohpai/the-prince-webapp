import React, { useState } from "react";
import { InputNumber, Form, Button, Upload, Select, Input } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import {
  PlayCircleTwoTone,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import firebase from "firebase";

import config from "../config";

const { Option } = Select;

export const JobRequestForm = () => {
  const [fileList, updateFileList] = useState<UploadFile<any>[]>([] as any[]);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [jwt, setJWT] = useState("");
  const onFinish = () => {};
  const onFinishFailed = () => {};

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

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
          accept="application/pdf"
          action={`${config.API_URL}/upload`}
          headers={{ Authorization: `Bearer ${jwt}` }}
          beforeUpload={async (_) => {
            user && setJWT(await user.getIdToken());
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
        <Select defaultValue="BLACK">
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
