export interface IDocumentItem {

  id: number;

  title: string;

  fileName: string;

  fileType: string;

  fileUrl: string;

  modified: string;

  modifiedBy: string;

  approvalStatus: string;

  category?: string;

  region?: string;
}