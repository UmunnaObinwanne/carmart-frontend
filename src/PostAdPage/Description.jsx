import React, { useEffect, useRef, forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomQuill = forwardRef((props, ref) => (
  <ReactQuill {...props} ref={ref} />
));

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
      <CustomQuill
        ref={quillRef}
        value={content}
        onChange={(content, delta, source, editor) => {
          setContent(editor.getHTML());
        }}
        theme="snow"
      />
    </div>
  );
};

export default Description;
