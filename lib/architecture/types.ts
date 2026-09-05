export type ComponentRole =
  | "actor"
  | "application"
  | "service"
  | "compute"
  | "database"
  | "storage"
  | "communication"
  | "network"
  | "security"
  | "external"
  | "annotation";

export type IssueSeverity = "info" | "warning" | "error";

export interface ArchitectureWarning {
  id: string;
  type: string;
  severity: IssueSeverity;
  message: string;
  nodeId?: string;
  edgeId?: string;
}

export interface SystemMetadata {
  technology?: string;
  environment?: string;
  [key: string]: unknown;
}
