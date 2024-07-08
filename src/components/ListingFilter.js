import { Slider } from "@mui/material";
import { useState } from "react"

export default function(){

    const [value, setValue] = useState([0, 100]);
    const handleChange = (event,newValue) => {
        setValue(newValue);
      };
    return (
      <div className="w-1/4 p-4 mx-3 border my-3 min-h-80">
        <h3>Filters</h3>
        <div>Price:</div>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={(e)=>e}
        />
      </div>
    );
}