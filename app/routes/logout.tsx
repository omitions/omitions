import { LoaderFunctionArgs } from '@remix-run/node'
import { auth } from '~/utils/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await auth.logout(request, { redirectTo: "/" });
}