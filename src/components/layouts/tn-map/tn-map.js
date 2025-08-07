// import React from "react";

// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup
// } from "react-simple-maps";

// import "./tn-map.css";

// import { tnTopo } from './tn';

// const geoUrl = tnTopo;
// const scaleMap = 1300;

// const handleFilter = ({ constructor: { name } }) => {
//   return name !== "MouseEvent" && name !== "TouchEvent";
// };
// const TNmap = ({ setTooltipContent, setDistrictName }) => (
//   <div>
//     <ComposableMap projection="geoMercator" width={130} height={130} projectionConfig={{ scale: scaleMap }}>
//       <ZoomableGroup zoom={1} maxZoom={1} center={[78.25, 10.8]} filterZoomEvent={handleFilter}>
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map(geo => <Geography
//               key={geo.rsmKey}
//               geography={geo}
//               onMouseEnter={() => {
//                 const { district } = geo.properties;
//                 setTooltipContent = { district }
//                 console.log(district);
//               }}
//               onMouseLeave={() => {
//                 setTooltipContent = {}
//               }}
//               onClick={() => {
//                 const { district } = geo.properties;
//                 setDistrictName = { district }
//                 console.log(district);
//               }}
//               style={{
//                 default: {
//                   fill: "#D6D6DA",
//                   outline: "none",
//                   stroke: "#607D8B", strokeWidth: 0.25
//                 },
//                 hover: {
//                   fill: "grey",
//                   outline: "none", stroke: "#607D8B", strokeWidth: 0.55
//                 },
//                 pressed: {
//                   fill: "#2E8B57",
//                   outline: "none", stroke: "#607D8B", strokeWidth: 0.25
//                 }
//               }}
//             />)
//           }
//         </Geographies>
//       </ZoomableGroup >
//     </ComposableMap>

//   </div>
// );

// export default TNmap;