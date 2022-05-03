export interface ResponseError {
  code: string;
  message: string;
  error: true;
  response: {
    data: {
      message: string;
    }
  }
}
export interface ResponseSuccess {
  data: {
    status: string;
  };
  success: boolean;
  error?: string;
}
export type TResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
}
