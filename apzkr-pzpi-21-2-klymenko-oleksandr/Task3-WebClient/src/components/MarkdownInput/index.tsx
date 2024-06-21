import { useState } from "react";
import { Input } from "@mantine/core";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import styles from "./styles.module.scss";

type MarkdownInputProps = {
  onChange: (value: string) => void;
  value: string;
  label?: string;
};

export const MarkdownInput = ({ onChange, value, label }: MarkdownInputProps) => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <Input.Wrapper
      className={styles.root}
      size="lg"
      label={label}
    >
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
      />
    </Input.Wrapper>
  );
};
