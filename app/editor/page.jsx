import AddDialog from "@/components/AddDialog";
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
  const data = await getData();
  const handleDataUpdate = async () => {
    "use server";
    revalidatePath("/editor");
  };
  if (!data) {
    return <AddDialog onSuccess={handleDataUpdate} />;
  }
  const urls = data.data;
  return <AddDialog onSuccess={handleDataUpdate} urls={urls} />;
};

export default page;
