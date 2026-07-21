import type React from "react";

export interface ReportColumn<T> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  visible: boolean;
  render: (row: T, index: number) => React.ReactNode;
}

export interface ReportTotal {
  label: string;
  value: React.ReactNode;
  emphasis?: boolean;
}

export interface ReportMeta {
  label: string;
  value: React.ReactNode;
}
