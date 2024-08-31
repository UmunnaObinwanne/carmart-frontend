//import "react-quill/quill/dist/quill.snow.css";
import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

const Description = ({ content, setContent }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    // You can interact with the Quill instance via quillRef.current if needed
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-md shadow-sm p-4">
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={(content, delta, source, editor) => {
          setContent(editor.getHTML()); // Ensure setContent is used correctly
        }}
        theme="snow"
      />
    </div>
  );
};

export default Description;
