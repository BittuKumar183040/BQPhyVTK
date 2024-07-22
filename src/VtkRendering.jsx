import React, {useState, Suspense} from 'react';
import { Bounds, Environment, Loader} from '@react-three/drei';
import { Canvas} from '@react-three/fiber';

import Graph from './components/Graph';
import GUI from './components/GUI';
import Draggable from 'react-draggable';
import Info from './components/extras/Info';
import MinMax from './components/extras/MinMax';
import CameraManipulation from './components/extras/CameraManipulation';
import CameraGUI from './components/extras/CameraGUI';
import ColorPalette from './components/extras/ColorPalette';
import { MemorizedModel } from './components/major/Model';
// import { useDispatch } from 'react-redux';
// import { setOuterValue } from './components/redux/vtksSlice';
// import { useMemo } from 'react';
import { Delta } from './components/extras/Delta';
import LimitVisibility from './components/extras/LimitVisibility';

const VtkRendering = ({ vtkData }) => {
  const [rotate, setRotate] = useState([0,0,0])
  const [metaData, setMetaData]=useState(vtkData)
  const [colorOption, setColorOption] = useState("displacement")
  const [distance, setDistance] = useState(null)
  const [limitVisible, setLimitVisible] = useState(0.1)

  const [viewOption, setViewOption]=useState({
    surface:true,
    points:[false, 1],
    wireframe:false,
    surface_edge:false
  })

  const changesMade=(e)=>{
    switch(e[0]){
      case "solid_color":
        setColorOption("solid_color")
        break;
      case "displacement":
        setColorOption("displacement")
      break;
      case "surface":
        setViewOption({
          surface:true,
          points:[false, 1],
          wireframe:false,
          surface_edge:false
        })
      break;
      case "points":
        let val=0;
        if(e[1]){
          val=parseFloat(e[1])
        }
        else{
          val=0
        }
        setViewOption({
          surface:false,
          points:[true, val],
          wireframe:false,
          surface_edge:false
        })
      break;
      case "wireframe":
        setViewOption({
          surface:false,
          points:[false, 1],
          wireframe:true,
          surface_edge:false
        })
      break;
      case "surface_with_edges":
        setViewOption({
          surface:false,
          points:[false, 1],
          wireframe:false,
          surface_edge:true
        })
        break;
      // case "min_max":
        // data(e[1])
      // break;
      default:
        console.log(e[0],"Menu Not Designed Yet!")
    }
  }
  const MinMaxChange=(e)=>{
    switch(e[0]){
      case "min_max":
        setDistance({...distance,minDis:e[1].minDis, maxDis:e[1].maxDis})
      break;
      default:
        console.log("Menu Not Designed Yet!")
    }
  }
  
  const handleCreated = (state) => {
    const { gl, controls, camera  } = state;
    if (gl) {
      gl.dispose();
    }
  }
  const sendBack=(e)=>{
    setMetaData({...vtkData, 
      Cells:e.Cells,
      Points:e.Points,
      Min:e.Min,
      Max:e.Max,
      scalerType:e.scalerType,
      is3D:e.is3D
    })
  }

  const [colorPalette, setColorPalette] = useState(["#00f", "#fff", "#f00"])
  const [deltaBack, setDeltaBack] = useState({x:0,y:0,z:0})
  // const delta=()=>{

  // }
  return (
    <>
    <div className='relative w-screen h-screen left-0 top-0 overflow-hidden' style={{background:"rgb(156, 163, 175)"}}>
        <Canvas camera={{near:0.000001}} onCreated={handleCreated}>
          <CameraManipulation dimension={metaData.is3D}/>
          <Bounds clip fit margin={0.25}>
            <ambientLight intensity={1} />

             {/* <hemisphereLight intensity={1} /> */}
            {/* <directionalLight 
              color={0xffffff} 
              intensity={1} 
              position={[0, 200, 0]} 
            /> */}
            

            <Suspense fallback={<p>Loading...</p>}>
            <MemorizedModel 
              rawData={vtkData}
              deltaBack={deltaBack}

              colorPalette={colorPalette}
              rotate={rotate}
              color={colorOption}
              customDistance={distance}
              options={viewOption}
              limitVisible={limitVisible}

              sendBack={sendBack}
            />
            </Suspense>
          </Bounds>
          <Loader/>
        </Canvas>
      {
        metaData.Min!==null && 
        <div className='absolute bottom-0 right-0 h-1/2 bg-slate-500'>
            <Graph colorPalette={colorPalette} distance={{Min:metaData.Min, Max:metaData.Max}}/>
        </div>
      }
      <div className='absolute left-2 top-2 flex gap-2'>
        <GUI changesMade={changesMade} metaData={metaData}/>
        <LimitVisibility distance={{min:metaData.Min, max:metaData.Max}} limitVisible={(val)=>setLimitVisible(val)}/>
        {metaData.Min===null?null:
        <MinMax MinMaxChange={MinMaxChange} metaData={{Min:metaData.Min, Max:metaData.Max}}/>
        }
        <CameraGUI changeRotate={(e)=>setRotate(e)}/>
        <ColorPalette changePalettes={(e)=>setColorPalette(e)}/>
        <div className='flex gap-2 flex-row h-9 px-2 cursor-pointer bg-white items-center rounded-md'>
          <p className=' font-bold'>{metaData.is3D?"3D":"2D"}</p>
        </div>
        <Delta dimension={metaData.is3D} setDeltaBack={setDeltaBack}/>
        {/* <div className='flex gap-2 flex-row h-9 px-2 cursor-pointer bg-white items-center rounded-md'>
          <p onClick={pointVariation}>👋</p>
        </div> */}
      </div>
      <Info/>
    </div>
    </>
  );
}

export default VtkRendering;