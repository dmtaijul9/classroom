import React from "react";
import RichTextEditor, { EditorValue } from "react-rte";

interface EditorProps {}

export const Editor: React.FC<EditorProps> = ({ onChange }) => {
  const [value, setValue] = React.useState<EditorValue>(
    RichTextEditor.createEmptyValue()
  );

  const onChangeEditorHandler = (newValue) => {
    setValue(newValue);
    console.log(value.toString("html"));
    onChange(value.toString("html"));
  };
  return (
    <RichTextEditor
      onChange={onChangeEditorHandler}
      value={value}
      className="min-h-[200px]"
    />
  );
};

export default Editor;
