import BetaAccessForm from "@/components/beta-access/form";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function BetaAccessPage() {
  const status = await getCookie("status", { cookies });

  return <BetaAccessForm status={status} />;
}
