import { createContext } from "react";

const ApartmentContext = createContext({
  fetchApartments: true,
});

export const AddApartmentContextProvider = (props, fetchApartments) => {
  const contextValue = {
    fetchApartments: fetchApartments,
  };

  return (
    <ApartmentContext.Provider value={contextValue}>
      {props.children}
    </ApartmentContext.Provider>
  );
};

export default ApartmentContext;
