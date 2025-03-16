export interface CommandResponse<T> {
  //
  response?: T;
  requestFailed?: boolean;
  failureMessage?: {
    exceptionName?: string;
    exceptionMessage?: string;
    exceptionCode?: string;
  };
}
