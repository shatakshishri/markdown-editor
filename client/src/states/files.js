import create from "zustand";

const state = create((set) => ({
  files: [],
  setFiles: (data) => set((state) => ({ files: data })),
}));

export default state;
