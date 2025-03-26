import { Response } from "express";

export default class BaseController {
  postOk(params: { message: string; data: Object }) {
    return { ...params, statusCode: 201 };
  }

  getOk(params: { message: string; data: Object }) {
    return { ...params, statusCode: 200 };
  }
}
