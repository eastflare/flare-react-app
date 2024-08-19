export interface MailSendRequest {
  subject: string;
  toAddress: string;
  ccAddress?: string;
  bccAddress?: string;
  content?: string;
}

export interface MailTemplateRequest {
  templateType: string;
  templateContents: any;
}
