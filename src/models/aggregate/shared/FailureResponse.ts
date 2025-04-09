export interface FailureResponse {
  //
  requestFailed?: boolean;
  failureMessage?: {
    exceptionName?: string;
    exceptionMessage?: string;
    exceptionCode?: string;
  };
}
