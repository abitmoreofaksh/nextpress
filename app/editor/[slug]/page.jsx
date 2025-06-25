import axios from "axios";
import Editor from "./Editor";
import { cookies } from "next/headers";

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

  if (!data) {
    return <div>There's no page as that please create a new page</div>;
  }
  const initialData = {
    content: data.data?.content,
    root: data.data?.root,
  };
  return <Editor initialData={initialData} slug={slug} />;
}
