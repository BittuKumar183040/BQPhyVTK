import React from 'react'
import { BufferGeometry, BufferAttribute, DoubleSide, Color, Float32BufferAttribute, MeshBasicMaterial} from 'three';





const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
    );
  };
  
  const getColorFromDistance = (distance, maxDistance) => {
    const minDistance = 0;
    const value = (distance - minDistance) / (maxDistance - minDistance);
    let h, s, l;
    if (value < 0.5) {
      h = 240; // Blue hue
      s = 100;
      l = Math.round(50 + value * 100); // Increase lightness to reach white
    } else {
      if (value < 0.75) {
        h = Math.round(240 - ((value - 0.5) * 4 * 240)) // Transition hue from blue to red
        s = 100;
        l = 100;
      } else {
        h = 0; // Red hue
        s = 100;
        l = Math.round(100 - ((value - 0.75) * 4 * 50)); // Decrease lightness to reach red
      }
    }
    return new Color(`hsl(${h}, ${s}%, ${l}%)`);
  };
  

  const getColorArray=(maxDistance, start, end)=>{
    let dis=[]
    let colors=[]
    start.map((cordStr, idx)=>{
      
      dis.push(calculateDistance(
        cordStr.split(" ").map((val)=>parseFloat(val)), 
        end[idx].split(" ").map((val)=>parseFloat(val)))
        )
    })
    console.log(dis)
    dis.map((distance)=>{
      colors.push(getColorFromDistance(distance, maxDistance))
    })
    return colors;
    // return dis.map((distance)=>console.log(getColorFromDistance(distance, maxDistance)))
    // console.log(colors)
        // const distance = calculateDistance(start, end);
        // const color = getColorFromDistance(distance, maxDistance);

  }
// const HeatMap = ({maxDistance, position, referencePosition }) => {
//     const distance = calculateDistance(position, referencePosition);
//     const color = getColorFromDistance(distance, maxDistance);
//   };

const Inner = ({vert, vertFinal, maxDistance}) => {
    let newData=[]
    let colors=[]
    let geometry = new BufferGeometry();
    let pointsData=vert.length
    vert.forEach((val)=>{
        val.split(" ").forEach((mainVal)=>{
            newData.push(parseFloat(mainVal))
        })
    })
    const vertices = new Float32Array(newData);
    const getIndices=(points)=>{
      let indices=[]
      switch(points){
        case 3:
          indices=[0,1,2]
          let colors=getColorArray(maxDistance, vert, vertFinal)
          // colors.push(new Color(1, 0, 0)); // Red for Vertex 1
          // colors.push(new Color(0, 1, 0)); // Green for Vertex 2
          // colors.push(new Color(0, 0, 1)); // Blue for Vertex 3
      
          const colorArray = new Float32Array(colors.length * 3);
          colors.forEach((color, i) => {
              color.toArray(colorArray, i * 3);
          });
          geometry.setAttribute('color', new Float32BufferAttribute(colorArray, 3));
        break;
        case 4:
          indices=[0,1,2,0,2,3]
        break;
        case 8:
          indices=[
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0, 
            3, 2, 6, 3, 6, 7   
          ]
        break;
        default:
          console.log(points, "CELLS data not supported")
        break;
      }
      return indices
    }

    const indices = new Uint16Array(getIndices(pointsData));
  
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    geometry.setIndex(new BufferAttribute(indices, 1));
    
    const material = new MeshBasicMaterial({ vertexColors: true, side:DoubleSide });
    
    return (
      <mesh geometry={geometry} material={material} />
    );
  };

export default Inner