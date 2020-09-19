import React, { useState } from "react";
import {
  Collapse,
  InputNumber,
  Row,
  Col,
  Space,
  Form,
  Button,
  Upload,
  message,
  Select,
  Input,
  Typography,
  Divider,
  Table,
} from "antd";
import Big from "big.js";
import {
  PlayCircleTwoTone,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { PayButton } from "./PayButton";
import { UploadFile } from "antd/lib/upload/interface";

interface BalanceProps {
  balance: Big;
}

const { Panel } = Collapse;
const { Title } = Typography;
const { Option } = Select;

const Balance = ({ balance }: BalanceProps) => {
  const minAmount = 5;
  const [amount, setAmount] = useState(new Big(minAmount));
  return (
    <Collapse>
      <Panel header={`Current balance: ${balance.toString()} €`} key="1">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row>
            <Col span={24}>
              <Title level={4}>Top up your wallet</Title>
              <Space direction="horizontal">
                amount
                <InputNumber
                  min={minAmount}
                  defaultValue={minAmount}
                  decimalSeparator=","
                  precision={2}
                  onChange={(val) => setAmount(new Big(val || 0))}
                />
                €.
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <PayButton amount={amount} />
            </Col>
          </Row>
        </Space>
      </Panel>
    </Collapse>
  );
};

const JobRequestForm = () => {
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

      <Form.Item
        label="Color mode"
        name="colorMode"
        rules={[{ required: true, message: "Please choose a color mode!" }]}
      >
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

const JobList = () => {
  const columns = [
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Requested at",
      dataIndex: "requestedAt",
      key: "requestedAt",
      render: (date: Date) => date.toLocaleTimeString(),
    },
  ];
  const data = [
    {
      key: "1",
      jobId: "abcd1234",
      status: "EXECUTED",
      requestedAt: new Date(),
    },
    {
      key: "2",
      jobId: "hello789",
      status: "PLACED",
      requestedAt: new Date(),
    },
    {
      key: "3",
      jobId: "world012",
      status: "FAILED",
      requestedAt: new Date(),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export const UserAction = () => (
  <Space
    direction="vertical"
    size="small"
    style={{ textAlign: "left", width: "100%" }}
  >
    <Balance balance={new Big(10.0)} />
    <Divider orientation="left">
      <Title level={4}>Submit a print job</Title>
    </Divider>
    <JobRequestForm />
    <Divider orientation="left">
      <Title level={4}>Jobs</Title>
    </Divider>
    <JobList />
  </Space>
);
