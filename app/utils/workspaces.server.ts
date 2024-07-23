import { sessionStorage } from "./auth.server";

export async function createWorkspace(form: FormData, request: Request) {
  const name = form.get("name");
  const description = form.get("description");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/create", {
    method: "POST",
    body: JSON.stringify({
      name,
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

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user").access_token;

  let resp = null;
  const fetched = await fetch("https://api.mybucks.today/workspaces/update", {
    method: "POST",
    body: JSON.stringify({
      _id,
      name,
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