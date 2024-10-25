export interface IJob {
  id?: number;
  jobName?: string | null;
  companyName?: string | null;
  location?: string | null;
  salaryDetails?: string | null;
  jobDescription?: string | null;
  expireDate?: string | null;
  jobApplyMethod?: string | null;
  fileUpload?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IJob> = {};
