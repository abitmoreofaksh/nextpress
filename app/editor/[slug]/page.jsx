import axios from "axios";
import Editor from "./Editor";
import { cookies } from "next/headers";
import "@measured/puck/puck.css";

export default async function page({ params }) {
  const { slug } = await params;
  const getData = async () => {
    try {
      const cookieStore = await cookies();
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/get-specific/${slug}`,
        {
          headers: { Cookie: cookieStore.toString() },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const data = await getData();

  return <Editor initialData={{ content: [], root: {} }} slug={slug} />;
}
