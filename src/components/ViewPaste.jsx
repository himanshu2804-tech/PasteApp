import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const {id}=useParams();
  const allpaste=useSelector((state) => state.paste.pastes);
  const paste=allpaste.filter((p) => p._id === id)[0];

  return (
  <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className=" inset-ring p-1 rounded-2xl mt-2 w-[60%] "
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button className=" inset-ring p-2 rounded-2xl " onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>
      <div className="mt-8">
        <textarea
          className="inset-ring rounded-2xl mt-4 min-w-[400px] p-4"
          value={paste.content}
          disabled
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
