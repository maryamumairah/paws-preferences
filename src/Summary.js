// import React from "react";

// function Summary({ likedCats }) {
//   return (
//     <div style={{ textAlign: "center", marginTop: "30px" }}>
//       <h2>🎉 Summary</h2>
//       <p>You liked {likedCats.length} cats!</p>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//           gap: "10px",
//           marginTop: "20px",
//         }}
//       >
//         {likedCats.map((cat, index) => (
//           <img
//             key={index}
//             src={cat}
//             alt="liked cat"
//             style={{
//               width: "100%",
//               height: "150px",
//               objectFit: "cover",
//               borderRadius: "10px",
//               boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Summary;
