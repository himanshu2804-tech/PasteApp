import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created successfully");
    },
    updateToPastes: (state, action) => {
      const paste=action.payload ;
      const index = state.pastes.findIndex((item) => item._id===paste.id);
      if(index>=0){
        state.pastes[index]=pastes;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste updated");
      }

    },
    resetAllPastes: (state, action) => {
       state.pastes=[];

       localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId=action.payload;

      const index=state.pastes.findIndex((item)=> item._id ===pasteId);

      if(index>=0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("paste deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
