import FlipLink from "./components/Fliplink";

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
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
  };

  return <Tag className={`font-bold ${sizeClasses[level]}`}>{text}</Tag>;
};

const MyParagraph = ({ text, classname }) => {
  return <p className={classname}>{text}</p>;
};

// Puck configuration
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
        text: { type: "text" },
        classname: { type: "text" },
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
