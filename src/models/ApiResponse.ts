import { ApiError } from "./ApiError";

export interface ApiResponse<T> {
    isSuccess: boolean;
    payload: T | ApiError;
}
