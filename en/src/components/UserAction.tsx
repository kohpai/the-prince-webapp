import React, { useEffect, useState } from "react";
import Big from "big.js";
import { Space, Typography, Divider, Table, message, Popover } from "antd";
import { gql, useMutation } from "@apollo/client";

import { Balance } from "./Balance";
import { JobRequestForm } from "./JobRequestForm";
import { HealthStats, PrintJob, JobStatus } from "./commonTypes";

interface UserActionProps {
  healthStats?: HealthStats;
}

interface PrintJobRecord extends PrintJob {
  key: string;
}

const { Title, Paragraph } = Typography;

const statusMap = new Map<JobStatus, string>([
  ["PLACED", "EINGEREICHT"],
  ["EXECUTED", "AUSGEFÜHRT"],
  ["FAILED", "FEHLGESCHLAGEN"],
]);

const columns = [
  {
    title: "Auftrags ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: JobStatus) => statusMap.get(status),
  },
  {
    title: "Angefordert am",
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

export const UserAction = ({ healthStats }: UserActionProps) => {
  const [balance, setBalance] = useState<Big>(new Big(0));
  const [printJobs, updatePrintJobs] = useState<PrintJobRecord[]>([]);
  const [currentUser] = useMutation(CURRENT_USER);

  useEffect(() => {
    const main = async () => {
      if (!healthStats) {
        return;
      }

      const { data, errors } = await currentUser();

      if (errors) {
        console.log("Kohpai-error", errors);
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
  }, [currentUser, healthStats]);

  return (
    <Space className="info expand-space" direction="vertical" size="small">
      <Balance
        healthStats={healthStats}
        balance={balance}
        onBalanceUpdate={(b) => {
          setBalance(b);
          message.success("Dein Guthaben wurde aktualisiert", 3);
        }}
      />
      <Divider orientation="left">
        {healthStats && healthStats.printerConnected ? (
          <Title level={4}>Druckauftrag einreichen</Title>
        ) : (
          <Popover
            content={
              <Paragraph>
                Du kannst keinen Druckauftrag einreichen, solange kein Drucker
                angeschlossen ist{" "}
                <span role="img" aria-label="grinning-face">
                  😞
                </span>
                . Überprüfe den Status auf der Homepage und probiere es nochmal.
              </Paragraph>
            }
            title="Drucker ist nicht verbunden"
            trigger={["click", "hover"]}
          >
            <Title level={4}>Druckauftrag einreichen</Title>
          </Popover>
        )}
      </Divider>
      <JobRequestForm
        healthStats={healthStats}
        onBalanceUpdate={(b) => {
          setBalance(b);
          message.success("Dein Guthaben wurde aktualisiert", 3);
        }}
        onNewPrintJob={(job) => {
          updatePrintJobs([{ ...job, key: `${job.id}` }].concat(printJobs));
          message.success("Neuer Auftrag wurde hinzugefügt. Siehe unten.", 3);
        }}
      />
      <Divider orientation="left">
        <Title level={4}>Aufträge</Title>
      </Divider>
      <Table columns={columns} dataSource={printJobs} />
    </Space>
  );
};
