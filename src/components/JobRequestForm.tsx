import React, { useState } from "react";
import {
  InputNumber,
  Form,
  Button,
  Upload,
  Select,
  Input,
  Typography,
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

const { Option } = Select;
const { Title } = Typography;

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

export const JobRequestForm = () => {
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

  const onFinish = (values: any) => {
    console.log("kohpai-finished", values);
  };
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
          onChange={({ fileList, file }) => {
            updateFileList(fileList.filter((file) => !!file.status).slice(-1));

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
          <Button icon={<UploadOutlined />}>Upload your document</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Color mode" name="colorMode">
        <Select
          defaultValue="BLACK"
          onChange={(value) => {
            const printConfig = { ...printPrice.config, colorMode: value };
            setPrincePrice({
              config: printConfig,
              price: calculatePrintPrice(printConfig),
            });
          }}
        >
          <Option value="BLACK">Black {"&"} White</Option>
          <Option value="COLOR">Color</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Page range"
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
                pageRange: value,
              };
              setPrincePrice({
                config: printConfig,
                price: calculatePrintPrice(printConfig),
              });
            } catch {}
          }}
        />
      </Form.Item>

      <Form.Item label="Copies" name="numCopies">
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
        />
      </Form.Item>

      <Form.Item
        style={{ fontWeight: "bold" }}
        label={<Title level={5}>You'll be charged</Title>}
        name="price"
      >
        <Title level={5}>{printPrice.price.toString()} €</Title>(
        {printPrice.config.pageRange
          ? parsePageRange(printPrice.config.pageRange)
          : printPrice.config.numPages}{" "}
        pages, {printPrice.config.numCopies} copies)
      </Form.Item>

      <Form.Item label={<PlayCircleTwoTone />}>
        <Button type="primary" htmlType="submit">
          <PrinterOutlined />
          Print
        </Button>
      </Form.Item>
    </Form>
  );
};
