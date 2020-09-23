import React from "react";
import { Space, Typography, Divider, Table } from "antd";
import Big from "big.js";

import { Balance } from "./Balance";
import { JobRequestForm } from "./JobRequestForm";

const { Title } = Typography;

export const UserAction = () => {
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

  return (
    <Space className="info expand-space" direction="vertical" size="small">
      <Balance balance={new Big(10.0)} />
      <Divider orientation="left">
        <Title level={4}>Submit a print job</Title>
      </Divider>
      <JobRequestForm />
      <Divider orientation="left">
        <Title level={4}>Jobs</Title>
      </Divider>
      <Table columns={columns} dataSource={data} />
    </Space>
  );
};
