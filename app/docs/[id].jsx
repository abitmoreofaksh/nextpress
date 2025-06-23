import { Render } from "@measured/puck";
import { config } from "../../puck.config";

export async function getStaticProps({ params }) {
  const data = await fetchDocData(params.id); // from your backend
  return { props: { data } };
}

export default function DocPage({ data }) {
  return <Render config={config} data={data} />;
}
