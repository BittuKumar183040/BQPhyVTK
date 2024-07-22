import { Color } from 'three';

const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
    );
  };
  
  const getColorFromDistance = (distance, minDistance, maxDistance) => {
    const value = (distance - minDistance) / (maxDistance - minDistance);
    let h, s, l;
    if (value < 0.5) {
      h = 240; // Blue
      s = 80;
      l = Math.round(25 + value * 110);
    } else {
        if (value < 0.45) {
            h = Math.round(240 - ((value - 0.5) * 4 * 240)); // from blue to red
            s = 80;
            l = 100; 
        } else {
            h = 0; // Red
            s = 80;
            l = Math.round(50 - ((value - 0.75) * 4 * 30)); 
        }
    }
    return new Color(`hsl(${h}, ${s}%, ${l}%)`);
  };
  
export const HeatMap = ({scale, minDistance, maxDistance, position, referencePosition }) => {
    const distance = calculateDistance(position, referencePosition);
    const color = getColorFromDistance(distance, minDistance, maxDistance);
  
    return (
        <mesh position={position} scale={scale}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={color} />
        </mesh>
    );
  };
  
  