import { sessionStorage } from "./auth.server";
import { escapeRegexNumber } from "./misc";

export async function createWorkspace(form: FormData, request: Request) {
  const name = form.get("name");
  const description = form.get("description");

  if (!name || !description) throw new Error("Error");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/create", {
    method: "POST",
    body: JSON.stringify({
      name: name.toString().trim(),
      description
    }),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  console.log('response: ', resp);
  return {...resp}
}

export async function updateWorkspace(form: FormData, request: Request) {
  const name = form.get("name");
  const description = form.get("description");
  const _id = form.get("_id");

  if (!name || !description) throw new Error("Error");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/update", {
    method: "POST",
    body: JSON.stringify({
      _id,
      name: name.toString().trim(),
      description,
    }),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  console.log('response: ', resp);
  return {...resp}
}

export async function removeWorkspace(form: FormData, request: Request) {
  const _id = form.get("_id");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/delete", {
    method: "POST",
    body: JSON.stringify({
      _id,
    }),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  console.log('response: ', resp);
  return {...resp}
}

export type TWorkspaces = {
  _id: string,
  description: string,
  name: string,
  user_id: string,
}
export async function getWorkspaces(request: Request): Promise<TWorkspaces[]> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/list", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  // console.log('response: ', resp);
  return resp
}

export async function createTransaction(form: FormData, request: Request) {
  const amount = form.get("amount");
  const description = form.get("description");
  const type = form.get("type");
  const loop_type = form.get("loop_type");
  const loop_count = form.get("loop_count");
  const workspaces_id = form.get("workspaces_id");
  const date_time = form.get("date_time");

  if (
    !amount ||
    typeof amount !== "string" ||
    !loop_count ||
    typeof loop_count !== "string"
  ) throw new Error("Error");

  console.log(">>>> payload", {
    amount: +escapeRegexNumber(amount),
    description,
    type,
    loop_type,
    loop_count: +escapeRegexNumber(loop_count),
    workspaces_id,
    date_time,
  })

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/cashflows/create", {
    method: "POST",
    body: JSON.stringify({
    amount: +escapeRegexNumber(amount),
    description: description?.toString().trim(),
    type,
    loop_type,
    loop_count: +escapeRegexNumber(loop_count),
    workspaces_id,
    date_time,
  }),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  console.log('response: ', resp);
  return {...resp}
}

export type TTransactions = {
  _id: string
  amount: number
  type: "cash_in" | "cash_out"
  description: string
  loop_type: string
  loop_count: number
  workspaces_id: string
  date_time: string
}
export async function getTransactions(request: Request, workspaceId: string | null | undefined, d:string, date: string): Promise<unknown[] | object> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  // console.log('workspaceId: ', workspaceId);
  // console.log('d: ', d);
  // console.log('date: ', date);
  // console.log(`https://api.mybucks.today/cashflows/list?workspaces_id=${workspaceId}&date=${d}-${date}`)

  let resp = null;
  const fetched = await fetch(`https://api.mybucks.today/cashflows/list?workspaces_id=${workspaceId}&date=${d}-${date}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  console.log('response: ', resp);
  return resp
}