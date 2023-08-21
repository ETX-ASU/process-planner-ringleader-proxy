import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { richTextToolbar } from "./consts";
import "./RichText.module.scss";

export const RichText = ({ html, onChange, placeholder = "Enter instructions or information for your students here..." }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(html))
    )
  );

  useEffect(() => {
    if (editorState) {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      onChange(html);
    }
  }, [editorState, onChange]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={richTextToolbar}
      placeholder={placeholder}
    />
  );
};

RichText.propTypes = {
  html: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
