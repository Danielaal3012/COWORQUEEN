import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {

  const [rooms, setRooms] = useState(() => {
    const storedRooms = localStorage.getItem("rooms");
    return storedRooms ? JSON.parse(storedRooms) : { data: [], lastUpdated: null };
  });

  const [navigationData, setNavigationData] = useState(() => {
    const storedNavigationData = localStorage.getItem("navigationData");
    return storedNavigationData
      ? JSON.parse(storedNavigationData)
      : { path: "", savedPath: "", scroll: 0 };
  });

  const updateNavigationData = (newNavigationData) => {
    setNavigationData(newNavigationData);
    localStorage.setItem("navigationData", JSON.stringify(newNavigationData));
  };

  const updateRooms = (newRooms) => {
    const updatedRooms = {
      data: newRooms,
      lastUpdated: new Date().toISOString(),
    };
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };

  useEffect(() => {
    const storedRooms = localStorage.getItem("rooms");
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
    const storedNavigationData = localStorage.getItem("navigationData");
    if (storedNavigationData) {
      setNavigationData(JSON.parse(storedNavigationData));
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ rooms, navigationData, updateRooms, updateNavigationData }}
    >
      {children}
    </DataContext.Provider>
  );
}
