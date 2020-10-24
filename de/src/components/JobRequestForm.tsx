import React, { useState } from "react";
import {
  InputNumber,
  Form,
  Button,
  Upload,
  Select,
  Input,
  Typography,
  message,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import {
  PlayCircleTwoTone,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import Big from "big.js";

import config from "../config";
import { gql, useMutation } from "@apollo/client";
import { Loading } from "./Loading";
import { HealthStats, PrintJob } from "./commonTypes";

interface PrintConfig {
  colorMode: "BLACK" | "COLOR";
  pageRange?: string;
  numPages: number;
  numCopies: number;
}

interface PrintPrice {
  config: PrintConfig;
  price: Big;
}

interface JobRequestFormProps {
  healthStats?: HealthStats;
  onBalanceUpdate?(balance: Big): void;
  onNewPrintJob?(printJob: PrintJob): void;
}

const { Option } = Select;
const { Title } = Typography;

const SUBMIT_PRINT_JOB = gql`
  mutation SubmitPrintJob(
    $filename: String!
    $printConfig: PrintConfigInput!
  ) {
    submitPrintJob(input: { filename: $filename, printConfig: $printConfig }) {
      printJob {
        id
        createdAt
        status
        customer {
          balance
        }
      }
    }
  }
`;

function calculatePrintPrice(pc: PrintConfig): Big {
  const numPages = pc.pageRange ? parsePageRange(pc.pageRange) : pc.numPages;
  return new Big(
    pc.colorMode === "BLACK"
      ? config.printer.BLACK_CPP
      : config.printer.COLOR_CPP
  )
    .times(numPages)
    .times(pc.numCopies);
}

function parsePageRange(pr: string): number {
  const err = new Error("invalid input");
  const regex = /^([0-9]+(?:-[0-9]+)?)(?:,([0-9]+(?:-[0-9]+)?))*$/;
  const trimmedPr = pr.trim();

  if (!regex.test(trimmedPr)) {
    throw err;
  }

  return trimmedPr.split(",").reduce((numPages, range) => {
    const rangeList = range.split("-");
    if (rangeList.length > 1) {
      const start = parseInt(rangeList[0]);
      const end = parseInt(rangeList[1]);
      if (start >= end) {
        throw err;
      }
      numPages += end - start + 1;
    } else {
      numPages += 1;
    }

    return numPages;
  }, 0);
}

export const JobRequestForm = ({
  healthStats,
  onBalanceUpdate,
  onNewPrintJob,
}: JobRequestFormProps) => {
  const printerConnected = healthStats && healthStats.printerConnected;
  const [fileList, updateFileList] = useState<UploadFile<any>[]>([] as any[]);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [jwt, setJWT] = useState("");
  const [printPrice, setPrincePrice] = useState<PrintPrice>({
    config: {
      colorMode: "BLACK",
      numPages: 0,
      numCopies: 1,
    },
    price: new Big(0),
  });
  const [loading, setLoading] = useState(false);

  const [submitPrintJob] = useMutation(SUBMIT_PRINT_JOB);

  const onFinish = async () => {
    setLoading(true);

    let mutationResult: any;
    try {
      mutationResult = await submitPrintJob({
        variables: {
          filename: fileList[0].name,
          printConfig: printPrice.config,
        },
      });
    } catch (err) {
      setLoading(false);
      message.error(err.message);
      return;
    }

    const { data, errors } = mutationResult;

    setLoading(false);

    if (errors) {
      message.error(
        `Druckauftrag konnte nicht eingereicht werden: ${errors[0].message}`,
        0
      );
      return;
    }

    const printJob = data.submitPrintJob.printJob;
    onBalanceUpdate && onBalanceUpdate(new Big(printJob.customer.balance));
    onNewPrintJob &&
      onNewPrintJob({
        id: printJob.id,
        status: printJob.status,
        createdAt: new Date(printJob.createdAt),
      });
  };

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

  return (
    <>
      <Form
        labelCol={{ md: 8 }}
        wrapperCol={{ md: 16 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        colon={false}
      >
        <Form.Item
          label="PDF Datei"
          name="filename"
          rules={[
            { required: true, message: "Bitte lade eine PDF Datei hoch" },
          ]}
        >
          <Upload
            fileList={fileList}
            accept="application/pdf"
            action={`${config.API_URL}/upload`}
            headers={{ Authorization: `Bearer ${jwt}` }}
            beforeUpload={async (_) => {
              user && setJWT(await user.getIdToken());
            }}
            onChange={({ fileList, file }) => {
              updateFileList(
                fileList.filter((file) => !!file.status).slice(-1)
              );

              const { response } = file;
              if (response) {
                const printConfig = {
                  ...printPrice.config,
                  numPages: response.numPages,
                };
                setPrincePrice({
                  config: printConfig,
                  price: calculatePrintPrice(printConfig),
                });
              }
            }}
          >
            <Button icon={<UploadOutlined />} disabled={!printerConnected}>
              Lade dein Dokument hoch
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Farbmodus" name="colorMode">
          <Select
            defaultValue="BLACK"
            onChange={(value) => {
              const printConfig = { ...printPrice.config, colorMode: value };
              setPrincePrice({
                config: printConfig,
                price: calculatePrintPrice(printConfig),
              });
            }}
            disabled={!printerConnected}
          >
            <Option value="BLACK">Schwarz {"&"} Weiß</Option>
            <Option value="COLOR">Farbe</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Seitenbereich"
          name="pageRange"
          rules={[
            (_) => ({
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve();
                }

                return new Promise((resolve) => {
                  parsePageRange(value);
                  resolve();
                });
              },
            }),
          ]}
        >
          <Input
            placeholder="1,3,5-9,12"
            onChange={(e) => {
              try {
                const value = e.currentTarget.value;
                const printConfig = {
                  ...printPrice.config,
                  pageRange: value || undefined,
                };
                setPrincePrice({
                  config: printConfig,
                  price: calculatePrintPrice(printConfig),
                });
              } catch {}
            }}
            disabled={!printerConnected}
          />
        </Form.Item>

        <Form.Item label="Kopien" name="numCopies">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value) => {
              const printConfig = {
                ...printPrice.config,
                numCopies: +(value || 1),
              };
              setPrincePrice({
                config: printConfig,
                price: calculatePrintPrice(printConfig),
              });
            }}
            disabled={!printerConnected}
          />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "bold" }}
          label={<Title level={5}>Es werden belastet</Title>}
          name="price"
        >
          <Title level={5}>{printPrice.price.toString()} €</Title>(
          {printPrice.config.pageRange
            ? parsePageRange(printPrice.config.pageRange)
            : printPrice.config.numPages}{" "}
          Seiten, {printPrice.config.numCopies} Kopien)
        </Form.Item>

        <Form.Item label={<PlayCircleTwoTone />}>
          <Button type="primary" htmlType="submit" disabled={!printerConnected}>
            <PrinterOutlined />
            Print
          </Button>
        </Form.Item>
      </Form>
      <Loading
        loading={loading}
        title="Druckauftrag wird eingereicht"
        text="Bitte hab einen Moment Geduld, während wir deinen Druckauftrag einreichen."
      />
    </>
  );
};