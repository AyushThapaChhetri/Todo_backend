import { Response } from "express";
import { Controller } from "tsoa";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export default class BaseController extends Controller {
  postOk<T>(params: { message: string; data: T }): ApiResponse<T> {
    return { ...params, statusCode: 200 };
  }

  // postOk(params: { message: string; data: Object }) {
  //   return { ...params, statusCode: 200 };
  // }
  getOk(params: { message: string; data: Object }) {
    return { ...params, statusCode: 200 };
  }
}
