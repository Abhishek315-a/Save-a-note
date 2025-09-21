import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const AllPaste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    
    <div className="flex flex-col gap-2 items-center">
      <div className="font-bold text-4xl text-gray-800 mb-2">
        All Notes are here!
      </div>
      <input
        className="w-[600px] p-2 border-2 border-gray-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        type="text"
        name="searchBar"
        value={searchTerm}
        placeholder="Search your Note here..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div className="flex flex-col gap-5 w-[600px] ">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            console.log("Paste ID:", paste._id);
            return (
              <div
                className="w-[600px] h-[130px] border border-gray-300 rounded-xl shadow-md p-4 flex flex-row items-start justify-between w-full bg-white hover:shadow-lg transition duration-200"
                key={paste?._id}
              >
                {/* Title + Content */}
                <div className="flex flex-col w-2/3 gap-1 h-full overflow-hidden"> {/*w-3/5 gap-1 max-h-60*/ /*max-w-[300px]*/}
                  <div className="text-lg font-bold text-gray-800">
                    {paste.title}
                  </div>
                  <div className=" max-w-full text-gray-700 text-sm line-clamp-5">
                    {paste.content}
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex flex-col items-end justify-evenly w-1/3 h-full gap-2">
                  <div className="flex flex-row gap-5 justify-end w-full">
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <FiEdit2 className="text-black-500 text-xl hover:scale-110 transition duration-150" />
                    </Link>
                    <Link to={`/AllPaste/${paste?._id}`}>
                      <FaEye className="text-black-500 text-xl hover:scale-110 transition duration-150" />
                    </Link>
                    <button onClick={() => handleDelete(paste?._id)}>
                      <FaTrash className="text-black-500 text-xl hover:scale-110 transition duration-150" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Paste Copied");
                      }}
                    >
                      <FaRegCopy className="text-black-600 text-xl hover:scale-110 transition duration-150" />
                    </button>
                    <button
                      onClick={() => {
                        const shareData = {
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        };

                        if (navigator.share) {
                          navigator.share(shareData).catch((err) => {
                            toast.error("Error sharing: " + err.message);
                          });
                        } else {
                          navigator.clipboard
                            .writeText(paste.content)
                            .then(() =>
                              toast.success(
                                "Paste content copied to clipboard!"
                              )
                            )
                            .catch(() =>
                              toast.error("Failed to copy to clipboard")
                            );
                        }
                      }}
                    >
                      <FaShareAlt className="text-black-500 text-xl hover:scale-110 transition duration-150" />
                    </button>
                  </div>

                  {/* Date row */}
                  <div className="flex flex-row items-center gap-2 text-gray-600 text-sm italic mt-1">
                    <FaCalendarAlt className="text-black-500 text-xl"/>
                    <span>
                      {new Date(paste.CreatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPaste;
