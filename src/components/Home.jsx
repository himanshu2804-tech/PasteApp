import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes=useSelector((state) => state.paste.pastes);
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      toast.success("updated successfully");
      dispatch(updateToPastes(paste));

    } else {
      // create
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

useEffect(() => {
      if(pasteId){
        const paste=allPastes.find((p) => p._id ===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className=" inset-ring p-1 rounded-2xl mt-2 w-[60%] "
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className=" inset-ring p-2 rounded-2xl " onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="inset-ring rounded-2xl mt-4 min-w-[400px] p-4"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
