import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const storedRooms = localStorage.getItem("rooms");
  const rooms = storedRooms ? JSON.parse(storedRooms) : [];

  const updateRooms = (rooms) => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  };

  return (
    <DataContext.Provider value={{ rooms, updateRooms }}>
      {children}
    </DataContext.Provider>
  );
}
