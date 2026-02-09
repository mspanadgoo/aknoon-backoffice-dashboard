import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const c = await cookies();
  const token = c.get("auth_token")?.value;
  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
