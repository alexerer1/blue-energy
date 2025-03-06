export interface CaseData {
  id: string;
  name: string;
  hosts: number;
  clusters: number;
  nodes: number;
  images: number;
  severity?: "warning" | "error";
  timestamp?: string;
  devicePath?: string;
  description?: string;
}
