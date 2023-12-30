import React from 'react'
import { BufferGeometry, BufferAttribute, DoubleSide, Color, Float32BufferAttribute, MeshBasicMaterial} from 'three';





const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
    );
  };
  
  const getColorFromDistance = (distance, maxDistance, minDistance) => {
    const value = (distance - minDistance) / (maxDistance - minDistance);
    let h, s, l;
    if (value < 0.5) {
      h = 240; // Blue hue
      s = 80;
      l = Math.round(25 + value * 110); // Limit the upper range of lightness for blue
    } else {
        if (value < 0.45) {
            h = Math.round(240 - ((value - 0.5) * 4 * 240)); // Transition hue from blue to red
            s = 80;
            l = 100; // Keep lightness lower to avoid white
        } else {
            h = 0; // Red hue
            s = 80;
            l = Math.round(50 - ((value - 0.75) * 4 * 30)); // Adjust lightness to reach red
        }
    }
      return new Color(`hsl(${h}, ${s}%, ${l}%)`);
  };
  

  const getColorArray=(maxDistance, minDistance, start, end)=>{
    let dis=[]
    let colors=[]
    start.map((cordStr, idx)=>{
      
      dis.push(calculateDistance(
        cordStr.split(" ").map((val)=>parseFloat(val)), 
        end[idx].split(" ").map((val)=>parseFloat(val)))
        )
    })
    dis.map((distance)=>{
      colors.push(getColorFromDistance(distance, maxDistance, minDistance))
    })
    return colors;
  }
const Inner = ({
      vert, 
      vertFinal, 
      maxDistance, 
      minDistance=0, 
      vertexColors=true, 
      wireframe=false
    }) => {
    let newData=[]
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
      let colorArray;
      let colors;

      switch(points){
        case 3:
          indices=[0,1,2]
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
          alert(points, "CELLS data not supported")
        break;
      }
      colors=getColorArray(maxDistance, minDistance, vert, vertFinal)
      colorArray = new Float32Array(colors.length * 3);
      colors.forEach((color, i) => {
          color.toArray(colorArray, i * 3);
      });
      geometry.setAttribute('color', new Float32BufferAttribute(colorArray, 3));
      return indices
    }

    const indices = new Uint16Array(getIndices(pointsData));
  
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    geometry.setIndex(new BufferAttribute(indices, 1));
    
    const material = new MeshBasicMaterial({ 
      vertexColors: vertexColors, 
      side:DoubleSide, 
      wireframe:wireframe
    });
    
    return (
      <>
        <mesh geometry={geometry} material={material} />
      </>
    );
  };

export default Inner