import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);

  const paste = allPastes.filter((p)=>p._id==id)[0];
  console.log("Final Paste",paste);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 w-4/5 mx-auto my-0">
      <div className="flex gap-2 w-3/5 mx-auto my-0">
        <div className="w-4/5 my-0">
          <input
            type="text"
            placeholder="Enter your Title"
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border-2 border-grey w-full rounded-lg"
          />
        </div>
        {/* <div>
          <button
            className="bg-blue-600 p-2 rounded-lg text-white"
            onClick={createPaste}
          >
            {pasteId ? "Update My Paste" : "+ Create My Post"}
          </button>
        </div> */}
      </div>

      <div className="w-3/5 flex justify-center">
        <textarea
          name="text"
          id="textarea"
          cols="60"
          rows="20"
          className="bg-white text-black p-2 rounded-lg border-2 border-grey text-black w-full"
          placeholder="Start writing"
          value={paste.content}
          disabled
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
    </div>
  )
}

export default ViewPaste
