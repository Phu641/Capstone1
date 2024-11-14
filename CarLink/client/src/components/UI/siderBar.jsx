// // import React from "react";
// import React, { useState } from "react";
// // import { Col } from "reactstrap";
// import { Link } from "react-router-dom";
// import "../../../styles/siderBar.css";
// import {Col, FormGroup, Label, Input } from "reactstrap";

// const Sidebar = () => {
//     const [type, setType] = useState([]);
//     const [capacity, setCapacity] = useState(0);
//     const [priceRange, setPriceRange] = useState([0, 3000]);
  
//     return (
//       <div className="sidebar">
//         <h4>Loại</h4>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="sport" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             Sport
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="suv" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             SUV
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="mpv" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             MPV
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="sedan" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             Sedan
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="coupe" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             Coupe
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="hatchback" onChange={(e) => setType(e.target.checked ? [...type, e.target.value] : type.filter(item => item !== e.target.value))} />
//             Hatchback
//           </Label>
//         </FormGroup>
  
//         <h4>Sức chứa</h4>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="2person" onChange={(e) => setCapacity(e.target.checked ? 2 : 0)} />
//             2 người
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="4person" onChange={(e) => setCapacity(e.target.checked ? 4 : 0)} />
//             4 người
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="6person" onChange={(e) => setCapacity(e.target.checked ? 6 : 0)} />
//             6 người
//           </Label>
//         </FormGroup>
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" value="8ormore" onChange={(e) => setCapacity(e.target.checked ? 8 : 0)} />
//             8 hoặc hơn
//           </Label>
//         </FormGroup>
  
//         <h4>Giá</h4>
//         <input 
//           type="range" 
//           min="0" 
//           max="3000" 
//           value={priceRange[1]} 
//           onChange={(e) => setPriceRange([priceRange[0], e.target.value])} 
//         />
//         <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
//       </div>
//     );
//   };
  
//   export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/siderBar.css";
import { Col, FormGroup, Label, Input } from "reactstrap";

const Sidebar = () => {
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 3000]);

  return (
    <div className="sidebar">
      <h4>Loại</h4>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="sport" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "sport"} 
          />
          Sport
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="suv" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "suv"} 
          />
          SUV
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="mpv" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "mpv"} 
          />
          MPV
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="sedan" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "sedan"} 
          />
          Sedan
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="coupe" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "coupe"} 
          />
          Coupe
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="type" 
            value="hatchback" 
            onChange={(e) => setType(e.target.value)} 
            checked={type === "hatchback"} 
          />
          Hatchback
        </Label>
      </FormGroup>

      <h4>Sức chứa</h4>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="capacity" 
            value="2" 
            onChange={(e) => setCapacity(2)} 
            checked={capacity === 2} 
          />
          2 người
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="capacity" 
            value="4" 
            onChange={(e) => setCapacity(4)} 
            checked={capacity === 4} 
          />
          4 người
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="capacity" 
            value="6" 
            onChange={(e) => setCapacity(6)} 
            checked={capacity === 6} 
          />
          6 người
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="capacity" 
            value="8" 
            onChange={(e) => setCapacity(8)} 
            checked={capacity === 8} 
          />
          8 hoặc hơn
        </Label>
      </FormGroup>

      <h4>Giá</h4>
      <input 
        type="range" 
        min="0" 
        max="3000" 
        value={priceRange[1]} 
        onChange={(e) => setPriceRange([priceRange[0], e.target.value])} 
      />
      <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
    </div>
  );
};

export default Sidebar;
