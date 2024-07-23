import { sessionStorage } from "./auth.server";

export async function createWorkspaces(form: FormData, request: Request) {
  const title = form.get("title");
  const description = form.get("description");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/create", {
    method: "POST",
    body: JSON.stringify({
      name: title,
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
  console.log('response: ', resp);
  return resp
}