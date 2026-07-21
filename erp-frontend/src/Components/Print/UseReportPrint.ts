import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function useReportPrint() {
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef });
  return { contentRef, print };
}
