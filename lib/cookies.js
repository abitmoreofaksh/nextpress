import { cookies } from "next/headers";

export async function getCookieData() {
  const cookieData = await cookies();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}
