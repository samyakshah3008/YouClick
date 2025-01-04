import BetaAccessForm from "@/components/beta-access/form";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Page = async () => {
  const status = await getCookie("status", { cookies });

  return <BetaAccessForm status={status} />;
};

export default Page;
