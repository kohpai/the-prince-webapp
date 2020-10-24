export type JobStatus = "PLACED" | "EXECUTED" | "FAILED";

export interface PrintJob {
  id: number;
  status: JobStatus;
  createdAt: Date;
}

export interface HealthStats {
  printerConnected: boolean;
  welcome: boolean;
}
