import React, {useRef, useEffect, useState, useMemo} from 'react'
import { Box3, Group , Points, MeshStandardMaterial, ShaderMaterial, BufferGeometry, MeshDepthMaterial, PointsMaterial,DoubleSide, Color, Mesh, Float32BufferAttribute, MeshBasicMaterial, Vector3, FrontSide, BackSide} from 'three';
import { extend ,useThree } from '@react-three/fiber';

extend({ MeshBasicMaterial  });

    // global values
let initialPoints=[]
let cells=[]
let vertFinal=[]
let scalerType=""
let distance={minDis:0.0, maxDis:0.0}
let cellType=""
let is3D=false;

const calculateDistance = (point1, point2) => {
    return Math.sqrt(
        Math.pow(point2[0] - point1[0], 2) +
        Math.pow(point2[1] - point1[1], 2) +
        Math.pow(point2[2] - point1[2], 2)
        );
};


function pointDistance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    const dz = point1[2] - point2[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const Model = ({rawData, deltaBack, colorPalette, rotate, color, customDistance, options, limitVisible, sendBack}) => {
    let {gl, scene, camera} = useThree();
    const metaData = rawData
    const facesRef = useRef();
    // Extraction function
    const data = (dis)=>{
    
      let total_points, type_points, data_points=[];              // POINTS
      let total_cells, data_cells=[], data_cellsWithFinal=[]      // CELLS 
      let total_cellTypes, data_cellTypes=[]                      // CELL_TYPES
      let total_pointData, data_pointData=[]                      // POINT DATA
      let scalar_name, scalar_type, scalar_dataType, scalar_item; //Loopup Table
      let data_distanceArray=[];
      // --------------

      let spaceExp=/\s+/
      let lines=metaData.Data.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('POINTS')) {
          let n;
          // POINTS 8 double
          [ n , total_points, type_points]=line.split(" ")
          total_points=parseInt(total_points)
          for (let j = i + 1; j <= i + total_points; j++) {
            const pointValues = lines[j].trim().split(spaceExp).map(parseFloat);

            if(!is3D){
              if(pointValues[2]!==0){
                is3D=true
              }
            }

            let axis=pointValues.length;
            if(axis<=3){
              data_points.push(pointValues);
            }else
            {
              for(let k=0;k<axis;k+=3){
                data_points.push([pointValues[k],pointValues[k+1],pointValues[k+2]])
              }
            }
            if(data_points.length===total_points){ break;}
          }
        }

        if (line.startsWith('CELLS')) {
          let n, count;
          [n, total_cells, count]=line.split(" ")
          total_cells=parseInt(total_cells)
          for (let j = i + 1; j <= i + total_cells; j++) {
            let cellValue = lines[j].trim().split(spaceExp).map(parseFloat)
            cellValue=[...cellValue.slice(1, cellValue.length)]
            data_cells.push(cellValue.map(i=>data_points[i]))
          }
        }

        if (line.startsWith('CELL_TYPES')) {
          let n;
          [n, total_cellTypes]=line.split(" ")
          total_cellTypes=parseInt(total_cellTypes)
          for (let j = i + 1; j <= i + total_cellTypes; j++) {
            const cellValue = +lines[j].trim();
            data_cellTypes.push(cellValue)
          }
          // console.log("Points:",data_points, "Cells :", data_cells, "CELLTypes:", data_cellTypes)
        }
        if (line.startsWith('POINT_DATA') || line.startsWith('CELL_DATA')) {
          let n;
          [n, total_pointData]=lines[i].split(" ");
          
          [scalar_name, scalar_type, scalar_dataType, scalar_item]=lines[++i].split(" ");
          i++; // lookup_table default
          total_pointData=parseInt(total_pointData);
          let idx_pointRef=0
          for (let j = i + 1; j <= i + total_pointData; j++) {
            if(lines[j]){
              switch(scalar_type){
                case "Temperature":
                case "Displacement":
                  {
                    let init_cord=data_points[idx_pointRef++]
                    let final=lines[j].trim().split(spaceExp).map(parseFloat)
                    let calculatedLookup=[]
                    for(let i=0;i<3;i++){
                      let j=init_cord[i] - final[i]
                      if(!j)
                        j=0.0
                      calculatedLookup.push(j)
                    }
                    data_pointData.push(calculatedLookup)
                    data_distanceArray.push(pointDistance(init_cord, calculatedLookup))
                  }
                break;
                case "Element_Data":
                  {
                    data_pointData.push(parseFloat(lines[j]))
                    data_distanceArray.push(parseFloat(lines[j]))
                  }
                break;
                default:
                  console.log("Lookup Table is not been Implement for " + scalar_type)
              }
            }
          }   
        }
      }
      if(scalar_type==='Element_Data'){
        data_cellsWithFinal=[...data_pointData]
      }

      if(scalar_type==='Displacement'|| scalar_type==='Temperature'){
        lines.forEach((line, i)=>{
          if (line.startsWith('CELLS')) {
            let n, count;
            [n, total_cells, count]=line.split(" ")
            total_cells=parseInt(total_cells)
            for (let j = i + 1; j <= i + total_cells; j++) {
              let temp=[];
              const cellValue = lines[j].trim().split(spaceExp).map(parseFloat);
              let data=[...cellValue.slice(1, cellValue.length)]
              data.forEach((val)=>{
                // console.log(data_pointData[val])
                if(data_pointData[val])
                  temp.push(data_pointData[val])
                else
                  temp.push(data_points[val])
              })
              data_cellsWithFinal.push(temp)
            }
          }
        })
      }

      function getMinMaxValue(arr) {
        let minValue = Infinity;
        let maxValue = -Infinity;
        for (let item of arr) {
            if (item < minValue)
                minValue = item;
            if (item > maxValue)
                maxValue = item;
        }
        localStorage.setItem("minMax", `{"minDis":"${minValue}", "maxDis":"${maxValue}"}`)
        distance.minDis=minValue
        distance.maxDis=maxValue
      }
        if(!dis){
          getMinMaxValue(data_distanceArray)
        }
        else{
          distance.minDis=dis.minDis
          distance.maxDis=dis.maxDis
        }

        // console.log("New,",
        //   "Points:",data_points, 
        //   "Cells :", data_cells, 
        //   "CellTypes:", data_cellTypes, 
        //   "distanceArray", data_distanceArray,
        //   "distance:",distance, 
        //   // "PointData:", data_pointData,   //extra added
        //   "scalar_type:", scalar_type,
        //   "cellsWithFinal",data_cellsWithFinal,
        //   "3D", is3D,
        //   )
            
        initialPoints=data_points
        cells=data_cells
        cellType=data_cellTypes
        vertFinal=data_cellsWithFinal
        scalerType=scalar_type
    }
    // Above code is for file extraction
    const getColorFromDistance = (distance, maxDistance, minDistance, colorPalette) => {
        const value = (distance - minDistance) / (maxDistance - minDistance);
        const clampedValue = Math.min(1, Math.max(0, value));

        const index1 = Math.floor(clampedValue * (colorPalette.length - 1));
        const index2 = Math.ceil(clampedValue * (colorPalette.length - 1));
        const color1 = new Color(colorPalette[index1]);
        const color2 = new Color(colorPalette[index2]);
        const fraction = clampedValue * (colorPalette.length - 1) - index1;
        const interpolatedColor = new Color().copy(color1).lerp(color2, fraction);

        return interpolatedColor;
    };

    function getColorArrayDis(maxDistance, minDistance, start, end, colorPalette){
        return getColorFromDistance(calculateDistance(start, end), maxDistance, minDistance, colorPalette);
    }

    const createFacesGeometry = (cells, wireframe) => {
        const geometry = new BufferGeometry();
        const positions = [];
        const indices = [];
        const colors = [];
        const alpha=[]
        cells.forEach((faceVertices, faceIndex) => {
        const faceCellType=faceVertices.length
        let color=null;
        faceVertices.forEach((vertex, idx) => {
            positions.push(...vertex);
            switch(scalerType){
            case "Element_Data":
              color=getColorFromDistance(vertFinal[faceIndex], distance.maxDis, distance.minDis, colorPalette)
              // if(vertFinal[faceIndex]>distance.maxDis){
              //   color.a=0.01
              // }else{
              //   color.a=1
              // }
              colors.push(color.r, color.g, color.b);
            break;
            case "Displacement":
            case "Temperature":
                color=getColorArrayDis(distance.maxDis, distance.minDis, vertex, vertFinal[faceIndex][idx], colorPalette)
                colors.push(color.r, color.g, color.b);
            break;
            default:
                console.log("SCALER Type not Supported")
            }
        });
        const getIndices=(points)=>{
            let singleIndex=[]
            switch(points){
            case 3:
                singleIndex=[0,1,2]
            break;
            case 4:
                if(cellType[faceIndex]===10){
                singleIndex=[
                    0, 1, 2,
                    0, 1, 3,
                    0, 2, 3,
                    1, 2, 3
                ]
                break;
                }
                wireframe?
                // for displacement
                singleIndex=[0, 1, 0, 1, 2, 1, 2, 3, 2, 0, 3, 0]:
                // for solid
                singleIndex=[0, 1, 2, 0, 2, 3]
                break;
            case 8:
                wireframe?
                singleIndex=[
                0, 1, 0, 1, 2, 1, 2, 3, 2, 3, 0, 3, //bottom
                0, 4, 0, 1, 5, 1, 2, 6, 2, 3, 7, 3, //mid
                4, 5, 4, 5, 6, 5, 6, 7, 6, 7, 4, 7  //top
                ]:
                singleIndex=[
                0, 1, 2, 0, 2, 3,
                1, 5, 6, 1, 6, 2,
                5, 4, 7, 5, 7, 6,
                4, 0, 3, 4, 3, 7,
                4, 5, 1, 4, 1, 0, 
                3, 2, 6, 3, 6, 7   
                ]
            break;
            default:
                alert(points + "CELLS data not supported")
            break;
            }
            return singleIndex
        }
        const startIndex = faceIndex * faceCellType;
        const vertexIndices = getIndices(faceCellType).map((i)=>startIndex+i)
        indices.push(...vertexIndices);
        });

        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        geometry.setIndex(indices);

        const boundingBox = new Box3();
        boundingBox.setFromBufferAttribute(geometry.getAttribute('position'));
        const boundingBoxSize = new Vector3();
        boundingBox.getSize(boundingBoxSize);

        // Calculate scale factor based on bounding box size
        const scaleFactor = 1 / Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z);
        geometry.scale(scaleFactor, scaleFactor, scaleFactor)
        
        const center=new Vector3();
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        geometry.boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        geometry.rotateX((rotate[0] * Math.PI) / 180)
        geometry.rotateY((rotate[1] * Math.PI) / 180)
        geometry.rotateZ((rotate[2] * Math.PI) / 180)
        return geometry;

    };

    color=color==="solid_color"?false:true;

    const createFace = () => {
      const vertexShader = `
        varying vec4 vColor;
        void main() {
          vColor = vec4(color);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      const fragmentShader = `
      varying vec4 vColor;
      void main() {
        gl_FragColor = vColor;
      }
    `;

      const geometry=createFacesGeometry(cells, options.wireframe);
      const material = new MeshStandardMaterial({ 
      vertexColors:color,
      transparent: true,
      side: DoubleSide,
      wireframe: options.wireframe,
      });


      const faces = new Mesh(geometry, material);
      facesRef.current = faces;
      faces.castShadow = true;
      scene.add(faces);
    };

    const createPoint = (size) => {
        const material = new PointsMaterial({ 
        vertexColors:color,
        size: size 
        });
        const geometry=createFacesGeometry(cells, options.wireframe);
        const Point = new Points(geometry, material);
        facesRef.current = Point;
        scene.add(Point);
    };

    const surfaceEdge = () => {
        const group = new Group();
        const geometrySurface=createFacesGeometry(cells, false)
        const materialSurface = new MeshBasicMaterial({ 
        vertexColors:color,
        side: DoubleSide,
        wireframe: false });
        
        const geometryEdge=createFacesGeometry(cells, true);
        const materialEdge = new MeshBasicMaterial({ 
        vertexColors:false,
        color:0x000000,
        side: DoubleSide,
        wireframe: true });
        materialEdge.wireframeLinewidth = 0.01;
        const edge = new Mesh(geometryEdge, materialEdge);
        const faces = new Mesh(geometrySurface, materialSurface);
        group.add(edge);
        group.add(faces);
        scene.add(group)
        facesRef.current = group;
    };
    useMemo(()=>{
        data(customDistance)
        sendBack({
              Cells:cellType.length,
              Points:initialPoints.length,
              Min:distance.minDis,
              Max:distance.maxDis,
              scalerType,
              is3D
            })
    },[rawData, customDistance, deltaBack])

    useEffect(() => {
        const ref = facesRef.current;
        if (ref) {
        if(ref.type==="Group"){
            scene.remove(ref);
            ref.children.forEach(item=>{
            item.geometry.dispose();
            item.material.dispose();
            })
        }
        if(ref.type==="Mesh" || ref.type==="Points"){
            scene.remove(ref);
            ref.geometry.dispose();
            ref.material.dispose();
        }
        }

        if(options.surface || options.wireframe){
            createFace();
        }
        if(options.points[0]){
            createPoint(options.points[1])
        }
        if(options.surface_edge){
            surfaceEdge()
        }
        gl.render(scene, camera);
    }, [rawData, deltaBack, colorPalette, rotate, options, color, distance, customDistance]);

  return null;
};

export const MemorizedModel =  React.memo(Model)