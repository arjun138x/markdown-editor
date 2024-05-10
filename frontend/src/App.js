import React, { useState } from "react";
import axios from "axios";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleMarkdownChange = async (e) => {
    const markdownText = e.target.value;
    setMarkdown(markdownText);
    try {
      const { data } = await axios.post("http://localhost:5000/convert", {
        markdown: markdownText,
      });
      console.log(data.html);
      setHtml(data.html);
    } catch (error) {
      console.error("Error converting Markdown to HTML:", error);
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        {/* Input Div */}
        <div className="w-1/2 p-4 ">
          <textarea
            className="w-full h-full border rounded p-2 "
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Type Markdown here..."
          />
        </div>

        {/* Output Div */}
        <div className="w-1/2 p-4">
          <div
            className="border rounded p-4 h-full overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
