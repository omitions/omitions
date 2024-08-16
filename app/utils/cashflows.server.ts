import { sessionStorage } from "./auth.server";

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
