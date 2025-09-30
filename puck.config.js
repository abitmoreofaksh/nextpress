import BorderRayCard from "./components/BorderRayCard";
import Button from "./components/Button";
import { CodeBlock } from "./components/CodeBlock";
import FlipLink from "./components/Fliplink";
import LayoutHeading from "./components/LayoutHeading";

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
      render: Button,
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Shadow", value: "Shadow" },
            { label: "Solid", value: "Solid" },
            { label: "Gradient Border", value: "Gradient Border" },
            { label: "Classic Primary", value: "Classic Primary" },
            { label: "Soft Style", value: "Soft Style" },
            { label: "Ring Style", value: "Ring Style" },
            { label: "3D Effect", value: "3D Effect" },
            { label: "Cyber", value: "Cyber" },
            { label: "Slide Effect", value: "Slide Effect" },
            { label: "Nebula Glow", value: "Nebula Glow" },
            { label: "Matrix", value: "Matrix" },
            { label: "Holographic", value: "Holographic" },
            { label: "Pulse", value: "Pulse" },
            { label: "Geometric", value: "Geometric" },
            { label: "Neon Frame", value: "Neon Frame" },
            { label: "Liquid Flow", value: "Liquid Flow" },
            { label: "Circuit", value: "Circuit" },
            { label: "Cosmic Portal", value: "Cosmic Portal" },
            { label: "Echo", value: "Echo" },
            { label: "Aurora", value: "Aurora" },
            { label: "Cyber Pulse", value: "Cyber Pulse" },
            { label: "Neon Gradient", value: "Neon Gradient" },
            { label: "Digital Surge", value: "Digital Surge" },
            { label: "Energy Field", value: "Energy Field" },
            { label: "Tech Pulse", value: "Tech Pulse" },
            { label: "Plasma Glow", value: "Plasma Glow" },
            { label: "Digital Matrix", value: "Digital Matrix" },
            { label: "Cyberpunk Edge", value: "Cyberpunk Edge" },
            { label: "Neural Network", value: "Neural Network" },
          ],
        },
      },
    },
    CodeBlock: {
      render: CodeBlock,
      fields: {
        filename: { type: "text" },
        code: { type: "textarea" },
      },
    },
    RayCard: {
      render: BorderRayCard,
      fields: {
        heading: { type: "text" },
        description: { type: "text" },
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
    GridThree: {
      render: ({ content: Content }) => {
        return (
          <Content className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto " />
        );
      },
      fields: {
        content: { type: "slot", allow: ["RayCard"] },
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
