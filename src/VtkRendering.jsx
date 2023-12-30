import './App.css';
import React,{useState, useEffect, Suspense} from 'react';
import Inner from './components/Inner';
import { OrbitControls, Bounds, GizmoHelper, GizmoViewport} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { HeatMap } from './components/Heatmap'; 

import Graph from './components/Graph';
import GUI from './components/GUI';
import Loading from './components/Loading';


function VtkRendering({vtkMetaData, vtkData}) {
    const [loading, setLoading]=useState(true)
    const [POINTS, setPoints]=useState([])
    const [VARIATION, setVariation]=useState([])
    const [CELLS_INIT, setCellsInit]=useState([])
    const [CELLS_FINAL, setCellsFinal]=useState([])
    const [distance, setDistance]= useState(0.0)
    const [meshSize, setMeshSize]= useState(1)

    const [colorOption, setColorOption]=useState(true)
    const [viewOption, setViewOption]=useState({
      surface:true,
      points:false,
      wireframe:false,
    })

    const [metaData, setMetaData]=useState({
      Name:vtkMetaData.name,
      Size:vtkMetaData.size,
      Type:"Unstructured Grid",
      Cells:"",
      Points:"",
      Displacement:"",
    })
    /*
    const vtkData=async ()=>{
        return fetch("vtkData")
            .then((res)=>res.text())
            .then((data)=>data)
    }*/
    // max distance calculation
    function pointDistance(point1, point2) {
      const dx = point1[0] - point2[0];
      const dy = point1[1] - point2[1];
      const dz = point1[2] - point2[2];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    const data= async ()=>{
        setLoading(true)
        let [startPoint, points, PointLength]=[false, [],0]
        let [startCells, cellsInitial] = [false, []]
        let [startFinalCells, cellsFinal] = [false, []]
        let [startLookUp, lookUp]=[false, []]
        let maxDistance = 0;
        // const data=await vtkData();

        const data=vtkData;
        let spaceExp=/\s+/
        let lookUpPointsLen=0;
        data.split('\n').map((line, idx)=>{
            if(startPoint){
                points.push(line)
            }
            if(startCells){
              let data=line.split(spaceExp)
              data.shift();
              cellsInitial.push(data.map((val)=>points[parseInt(val)]))
            }
            if(startLookUp){
              let LookUpLine=line;
              let ref=points[0].split(spaceExp)
              let org=LookUpLine.trim().split(spaceExp)
              
              if(ref.length!=org.length){
                let i=0;
                let len=ref.length - org.length
                for(;i<len;i++){
                  LookUpLine=LookUpLine + "0.0"
                }
              }
              if(lookUpPointsLen<PointLength){
                let initial=points[lookUpPointsLen++].split(spaceExp)
                LookUpLine=initial.map((item, i)=>{
                    let data=parseFloat(item) - line.split(spaceExp)[i]
                    return data?data:parseFloat(item)
                })
              let [init, ref]=[LookUpLine, initial.map((val)=>parseFloat(val))]
                
              let size=pointDistance(init, ref)
              if(maxDistance<size){
                maxDistance=size
                setMeshSize(pointDistance(points[2].split(" "), points[3].split(" "))/100)
              }
              lookUp.push(LookUpLine.join(" "))
              }
            }
            
            if(line.includes("POINTS")){
              startPoint=true
              startCells=false
              startLookUp=false
            }
            if(line.includes("CELLS")){
              startPoint=false
              startCells=true
              startLookUp=false
            }
            if(line.includes("CELL_TYPES")){
              startPoint=false
              startCells=false
              startLookUp=false
            }
            if(line.includes("LOOKUP_TABLE")){
              //preset for lookup
              PointLength=points.length-1

              startPoint=false
              startCells=false
              startLookUp=true


            }
        })
        data.split('\n').map((line, idx)=>{
          if(startFinalCells){
            let data=line.split(spaceExp)
            data.shift();
            cellsFinal.push(data.map((val)=>lookUp[parseInt(val)]))
          }
          if(line.includes("CELLS")){startFinalCells=true}
          if(line.includes("CELL_TYPES")){startFinalCells=false}
        })
        points.pop()
        cellsInitial.pop()
        cellsFinal.pop()
        setVariation(lookUp)
        setPoints(points)
        setCellsInit(cellsInitial)
        setCellsFinal(cellsFinal)
        setDistance(maxDistance)
        setLoading(false)

        // metaData

        setMetaData({...metaData, 
          Points:PointLength, 
          Cells:cellsInitial.length, 
          Displacement:maxDistance})

    }
    useEffect(()=>{
      data()
    },[])
    const changesMade=(e)=>{
      switch(e[0]){
        case "solid_color":
          setColorOption(false)
          break;
        case "displacement":
          setColorOption(true)
        break;
        case "surface":
          setViewOption({
            surface:true,
            points:false,
            wireframe:false,
          })
        break;
        case "points":
          setViewOption({
            surface:false,
            points:true,
            wireframe:false,
          })
          if(e[1]){
            
            if(e[1]==0){
              setMeshSize(meshSize)
              break;
            }
            setMeshSize(meshSize * parseFloat(e[1]))
          }
        break;
        case "wireframe":
          setViewOption({
            surface:false,
            points:false,
            wireframe:true,
          })
        break;
      }
    }

  return (
    <>
    {loading?<p>loading...</p>
      :<div style={{position:"absolute",left:"0", top:"0", height:"100%", width:"100%"}}>
      <Canvas frameloop='demand' style={{background:"gray"} }>
          <OrbitControls makeDefault={true} enableDamping target={[0,0,0]}/>
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={2}>
              <group >
                {viewOption.points?

                  POINTS.map((val, idx)=>
                    <HeatMap key={idx} maxDistance={distance} scale={[meshSize, meshSize, meshSize]} position={val.split(" ")} referencePosition={VARIATION[idx].split(" ")} />
                    )
                  :

                  CELLS_INIT.map((val,idx)=>
                  <Inner 
                    key={idx}
                    vert={val}
                    vertFinal={CELLS_FINAL[idx]}
                    maxDistance={distance}
                    vertexColors={colorOption}
                    wireframe={viewOption.wireframe}
                    />)
                } 
                {/* {
                  POINTS.map((val, idx)=>
                    <Box 
                      key={idx} 
                      position={val.split(" ").length>2?val.split(" "):()=>val.split(" ").push('0')}
                      color="black"
                      scale={[1, 1, 1]}/>
                    )
                } */}
                
                {/* {console.log(VARIATION)} */}
                {/* varient for mapping */}
                 {/* {
                  VARIATION.map((val, idx)=>
                    <Box 
                      key={idx} 
                      position={val.split(" ")} 
                      color="red"
                      scale={[1,1,1]}/>
                      )
                } */}
              </group>
            </Bounds>
            {/* <GizmoHelper alignment="bottom-left" margin={[100, 100]}>
              <GizmoViewport labelColor="white" labels={["X", "Z", "-Y"]} axisHeadScale={0.8} />
            </GizmoHelper> */}
        </Suspense>
      </Canvas>
      <Graph minDis={0} maxDis={distance}/>
      <GUI changesMade={changesMade} metaData={metaData}/>
      </div>
    }
    </>
  );
}

export default VtkRendering;
