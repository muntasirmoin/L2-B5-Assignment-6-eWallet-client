export interface TErrorSources {
  path: string;
  message: string;
}

// Represents the full error response returned from backend
export interface TGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSources?: TErrorSources[];
}
