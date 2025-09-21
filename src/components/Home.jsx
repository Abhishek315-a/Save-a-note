import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [SearchParams, setSearchParams] = useSearchParams();
  const pasteId = SearchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setText(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: text,
      _id: pasteId || Date.now().toString(36),
      CreatedAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      //create
      dispatch(addToPaste(paste));
    }
    //after updation and creation
    setTitle("");
    setText("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-4/5 max-w-4xl mx-auto my-8 p-6 bg-gray-50 rounded-2xl shadow-lg">
      {/* Title + Save Button */}
      <div className="flex gap-4 w-full max-w-2xl">
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border-2 border-gray-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          onClick={createPaste}
        >
          {pasteId ? "Update Note" : "+ Save Note"}
        </button>
      </div>

      {/* Textarea */}
      <div className="w-full max-w-2xl">
        <textarea
          name="text"
          id="textarea"
          cols="60"
          rows="15"
          placeholder="Start writing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 bg-white text-gray-800 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
