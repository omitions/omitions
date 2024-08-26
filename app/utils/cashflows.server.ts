import { sessionStorage } from "./auth.server";
import { escapeRegexNumber } from "./misc";

// export type TWorkspaces = {
//   _id: string;
//   description: string;
//   name: string;
//   user_id: string;
// };
export async function getCalendar(
  request: Request,
  workspaceId: string,
  date: string,
): Promise<unknown> {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const token = session.get("user").access_token;

  let resp = null;
  // console.log('token: ', token);
  // console.log(`https://api.mybucks.today/cashflows/calendar?workspace_id=${workspaceId}&date=${date}`)
  // const fetched = await fetch(
  //   `https://api.mybucks.today/cashflows/calendar?workspace_id=${workspaceId}&date=${date}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // resp = await fetched.json();
  // console.log("response: ", resp);
  return resp;
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
  )
    throw new Error("Error");

  // console.log(">>>> payload", {
  //   amount: +escapeRegexNumber(amount),
  //   description,
  //   type,
  //   loop_type,
  //   loop_count: +escapeRegexNumber(loop_count),
  //   workspaces_id,
  //   date_time,
  // })

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  resp = await fetched.json();
  // console.log('response: ', resp);
  return { ...resp };
}

export type TTransactions = {
  _id: string;
  amount: number;
  type: "cash_in" | "cash_out" | "invoice";
  description: string;
  loop_type: string;
  loop_count: number;
  workspaces_id: string;
  date_time: string;
};
export async function getTransactions(
  request: Request,
  workspaceId: string | null | undefined,
  date: string,
): Promise<TTransactions[] | null> {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const token = session.get("user").access_token;

  let resp = null;
  // console.log("payload ??? ", `https://api.mybucks.today/cashflows/list?workspace_id=${workspaceId}&date=${date}`)
  const fetched = await fetch(
    `https://api.mybucks.today/cashflows/list?workspace_id=${workspaceId}-${date}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  resp = await fetched.json();
  // console.log("response: ", resp);
  return resp;
}
