export type CanvaBrandTemplate = {
  id: string;
  title: string;
  create_url: string;
  view_url: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  } | null;
  created_at: number;
  updated_at: number;
};

export type CanvaExportJob = {
  id: string;
  design_id: string;
  status: "queued" | "in_progress" | "success" | "failed";
  created_at: number;
  updated_at: number;
  result?: {
    downloads: Array<{
      url: string;
      format: string;
      page_number?: number;
    }>;
  };
  error?: {
    code: string;
    message: string;
  };
};

export type CanvaExportFormat = "pdf" | "png" | "jpg" | "gif" | "pptx" | "mp4";
