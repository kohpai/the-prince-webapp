import React, { useEffect, useState } from "react";
import Big from "big.js";
import { Space, Typography, Divider, Table, message } from "antd";
import { gql, useMutation } from "@apollo/client";

import { Balance } from "./Balance";
import { JobRequestForm } from "./JobRequestForm";
import { PrintJob } from "./commonTypes";

interface PrintJobRecord extends PrintJob {
  key: string;
}

const { Title } = Typography;

const columns = [
  {
    title: "Job ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Requested at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: Date) => date.toLocaleString(),
  },
];

const CURRENT_USER = gql`
  mutation CurrentUser {
    currentUser(input: {}) {
      customer {
        balance
        printJobs(orderBy: CREATED_AT_DESC) {
          nodes {
            id
            createdAt
            status
          }
        }
      }
    }
  }
`;

export const UserAction = () => {
  const [balance, setBalance] = useState<Big>(new Big(0));
  const [printJobs, updatePrintJobs] = useState<PrintJobRecord[]>([]);
  const [currentUser] = useMutation(CURRENT_USER);

  useEffect(() => {
    const main = async () => {
      const { data, errors } = await currentUser();

      if (errors) {
        message.error(`Failed to get your balance: ${errors[0].message}`, 0);
        return;
      }

      const customer = data.currentUser.customer;
      setBalance(new Big(customer.balance));

      const currPrintJobs: PrintJobRecord[] = customer.printJobs.nodes;
      updatePrintJobs(
        currPrintJobs.map((job) => ({
          ...job,
          createdAt: new Date(job.createdAt),
          key: `${job.id}`,
        }))
      );
    };
    main();
  }, [currentUser]);

  return (
    <Space className="info expand-space" direction="vertical" size="small">
      <Balance
        balance={balance}
        onBalanceUpdate={(b) => {
          setBalance(b);
          message.success("Your balance is adjusted.", 3);
        }}
      />
      <Divider orientation="left">
        <Title level={4}>Submit a print job</Title>
      </Divider>
      <JobRequestForm
        onBalanceUpdate={(b) => {
          setBalance(b);
          message.success("Your balance is adjusted.", 3);
        }}
        onNewPrintJob={(job) => {
          updatePrintJobs([{ ...job, key: `${job.id}` }].concat(printJobs));
          message.success("New job is added. Check out below.", 3);
        }}
      />
      <Divider orientation="left">
        <Title level={4}>Jobs</Title>
      </Divider>
      <Table columns={columns} dataSource={printJobs} />
    </Space>
  );
};
