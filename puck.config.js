import FlipLink from "./components/Fliplink";
import LayoutHeading from "./components/LayoutHeading";

// Define your components
const MyButton = ({ text, variant = "primary" }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    {text}
  </button>
);

const MyHeading = ({ text, level = 1 }) => {
  const Tag = `h${level}`;
  const sizeClasses = {
    1: "text-5xl",
    2: "text-4xl",
    3: "text-4xl",
    4: "text-2xl",
  };
  return (
    <Tag
      className={`font-bold px-4 text-neutral-900 py-2 leading-tight ${sizeClasses[level]}`}
    >
      {text}
    </Tag>
  );
};

const MyParagraph = ({ text }) => {
  return (
    <div className="relative ml-5 px-4 py-2">
      <span className="absolute block left-0 rounded-tr-full rounded-br-full top-0 z-20 h-full bg-neutral-200 dark:bg-neutral-700 w-[6px]" />
      <p className={`text-lg text-neutral-600`}>{text}</p>
    </div>
  );
};

export const config = {
  components: {
    Button: {
      render: MyButton,
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      },
    },
    MainHeading: {
      render: LayoutHeading,
      fields: {
        text: { type: "text" },
        height: { type: "number" },
        width: { type: "number" },
        borderRadius: { type: "number" },
      },
    },
    LinkFlip: {
      render: FlipLink,
      fields: {
        word: { type: "text" },
        link: { type: "text" },
      },
    },
    Paragraph: {
      render: MyParagraph,
      fields: {
        text: { type: "textarea" },
      },
    },
    Heading: {
      render: MyHeading,
      fields: {
        text: { type: "text" },
        level: {
          type: "select",
          options: [
            { label: "H1", value: 1 },
            { label: "H2", value: 2 },
            { label: "H3", value: 3 },
            { label: "H4", value: 4 },
          ],
        },
      },
    },
  },
};
