export interface CommandResponse {
  //
  response?: any;
  requestFailed?: boolean;
  failureMessage?: {
    exceptionName?: string;
    exceptionMessage?: string;
    exceptionCode?: string;
  };
}
