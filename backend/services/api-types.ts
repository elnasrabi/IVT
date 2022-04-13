import { GeneralApiProblem } from "./api-problems";

export interface User {
  id: number;
  name: string;
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem;
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem;
export type GetClientStatus = { kind: "ok"; ClientStatus: any,status: number } | GeneralApiProblem;
export type LoginUserResult = { kind: "ok"; user: any; authorization: any,Status:any } | GeneralApiProblem;
export type ExceptionResult = { kind: "ok"; Exception: any } | GeneralApiProblem;
export type Rule = { kind: "ok"; Rule: any } | GeneralApiProblem;
