import { cookies } from "next/headers";

export async function getCookieData() {
  const cookieData = await cookies();
  return cookieData.toString();
}
