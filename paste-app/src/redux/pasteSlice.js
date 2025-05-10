import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'; 
const initialState = {
  pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
     const paste = action.payload;
     
     state.pastes.push(paste);
     localStorage.setItem('pastes', JSON.stringify(state.pastes));
     toast.success('Paste added successfully');
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      // Check if paste with the same ID already exists
      const existingPaste = state.pastes.find(p => p.id === paste.id);
      if (existingPaste) {
        // If it exists, update the existing paste
        const index = state.pastes.indexOf(existingPaste);
        state.pastes[index] = paste;
        toast.success('Paste updated successfully');
      }
      // If it doesn't exist, add the new paste
      else {
        state.pastes.push(paste);
        toast.success('Paste added successfully');
      }
      state.pastes.push(paste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste added successfully');
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast.success('All pastes deleted successfully');
    },
    deleteFromPastes: (state, action) => {
      const index = state.pastes.findIndex(paste => paste._id === action.payload);
        if (index !== -1) {
            state.pastes.splice(index, 1);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success('Paste deleted successfully');
        } else {
            toast.error('Paste not found');
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,deleteFromPastes } = pasteSlice.actions

export default pasteSlice.reducer