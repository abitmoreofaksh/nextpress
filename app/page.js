import MainWrapper from "@/components/MainWrapper";
import PagesTable from "@/components/PagesTable";
import { getCookieData } from "@/lib/cookies";
import axios from "axios";
import { revalidatePath } from "next/cache";

const page = async () => {
  const getData = async () => {
    try {
      const cookieStore = await getCookieData();

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/get-url`,
        {
          headers: {
            Cookie: cookieStore,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const pages = await getData();
  const handleDataUpdate = async () => {
    "use server";
    revalidatePath("/");
  };
  return (
    <MainWrapper>
      <PagesTable pages={pages} onSuccess={handleDataUpdate} />
    </MainWrapper>
  );
};

export default page;
