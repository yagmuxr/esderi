// import React, { useContext, useEffect } from "react";
// import { FavoritesContext } from "../context/FavoritesProvider";
// import ProductCard from "../components/Products/ProductCard";

// const FavoritesPage = () => {
//   const { favorites, setFavorites } = useContext(FavoritesContext);
//   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (user) {
//         const apiUrl = import.meta.env.VITE_API_BASE_URL;
//         try {
//           const response = await fetch(`${apiUrl}/api/favorites/${user._id}`);
//           const data = await response.json();
//           setFavorites(data);
//         } catch (error) {
//           console.error("Failed to fetch favorites:", error);
//         }
//       }
//     };

//     fetchFavorites();
//   }, [user, setFavorites]);

//   return (
//     <div className="favorites-page">
//       <h2>Your Favorites</h2>
//       <div className="product-grid">
//         {favorites.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FavoritesPage;
