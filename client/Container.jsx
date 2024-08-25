// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import ReactQuill from "react-quill"; // Import ReactQuill from react-quill

// Importing styles
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./Quill.css"; // Import your custom styles

const Editor = () => {
  // Editor state
  const [value, setValue] = useState("");

  // Editor ref
  const quillRef = useRef(null);

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quillRef.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className="wrapper">
      <label className="label">Editor Content</label>
      <ReactQuill
        ref={quillRef}
        className="editor"
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={setValue}
      />
      <button onClick={handler} className="btn">
        Submit
      </button>
    </div>
  );
};

export default Editor;
