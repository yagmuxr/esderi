// import React, { createContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";

// export const FavoritesContext = createContext();

// const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState(
//     localStorage.getItem("favorites")
//       ? JSON.parse(localStorage.getItem("favorites"))
//       : []
//   );

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const addToFavorites = (product) => {
//     setFavorites((prevFavorites) => [...prevFavorites, product]);
//   };

//   const removeFromFavorites = (productId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((item) => item._id !== productId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider
//       value={{ favorites, addToFavorites, removeFromFavorites, setFavorites }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// FavoritesProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default FavoritesProvider;
