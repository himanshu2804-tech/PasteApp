import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const handleShare = async (paste) => {
    try {
      await navigator.share({
        title: paste.title,
        text: paste.content,
      });

      toast.success("Shared successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        className="inset-ring p-2 rounded-2xl min-w-[600px]"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>

                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div>{new Date (paste.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric', year:'numeric'})}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
