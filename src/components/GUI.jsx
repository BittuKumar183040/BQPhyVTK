import React, { useState } from 'react'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'

const GUI = ({changesMade, metaData}) => {
    const [active, setActive]=useState()
    const [pointSize, setPointSize]=useState(0)
    const [showInfo, setShowInfo]=useState(false)
    const [showProp, setShowProp]=useState(false)
    const info={
            "Name": metaData.Name,
            "Size": metaData.Size,
            "Type": metaData.Type,
            "Cells": metaData.Cells,
            "Points": metaData.Points,
            "Min":metaData.Min,
            "Max":metaData.Max,
    }
    // console.log(metaData)

    const guiChanges=(e)=>{
        changesMade(e)
    }

    const viewOptions=(e)=>{
        setActive(e.target.value)
        guiChanges([e.target.value])
    }
    
    const pointSizeChange=(e)=>{
        let val=e.target.value
        setPointSize(val)
        guiChanges(["points",val])
    }
    return (
    <div className='flex gap-2 flex-col text-md select-none'>
        <div className=' rounded-md overflow-hidden' style={{background:"#fffa",backdropFilter:"blur(2px)"}}>
            <div onClick={()=>setShowProp(!showProp)} className='flex justify-between items-center p-2 min-w-full cursor-pointer'>
                <p className=' font-bold'> Properties</p>
                {!showProp && <BiDownArrow className='pointer-events-none'/>}
                {showProp && <BiUpArrow className='pointer-events-none'/>}
            </div>
            {showProp && <div className='flex flex-col p-2 gap-2'>
                <label htmlFor="coloring">Coloring</label>
                <select if="coloring" className='bg-gray-200 border-r-8 outline-none px-2 py-2 cursor-pointer rounded-md' style={{boxShadow:"0 2px 4px rgba(0, 0, 0, 0.25)"}} onChange={(e)=>guiChanges([e.target.value])}>
                    <option style={{lineHeight:"10px", height:"20px"}} value="displacement">{metaData.scalerType}</option>
                    <option value="solid_color">Solid Color</option>
                </select>
                <hr/>
                <label htmlFor="representation">Representation</label>
                <select id="representation" className=' bg-gray-200 border-r-8 outline-none px-2 py-2 cursor-pointer rounded-md' style={{boxShadow:"0 2px 4px rgba(0, 0, 0, 0.25)"}} onChange={viewOptions}>
                    <option value="surface">Surface</option>
                    {/* <option style={options} value="surface_with_edges">Surface With Edges</option> */}
                    {metaData.scalerType!=='Element_Data' && 
                        <>
                        <option value="points">Points</option>
                        <option value="wireframe">Wireframe</option>
                        </>
                    }
                    <option value="surface_with_edges">Surface With Edges</option>
                    
                </select>
                {
                    active==="points" &&
                        <div className=' rounded-lg m-0 flex bg-gray-100 justify-between p-2'>
                            <p>Size</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</p>
                            <input 
                                type='number'
                                className=' w-20 border-2 shadow-inner px-2 border-gray-400 rounded-lg'
                                value={pointSize}
                                onChange={pointSizeChange}
                                step={0.01}
                            />
                    </div>
                }
            </div>
            }
        </div>
        <div className='bg-white p-2 w-72 min-w-full rounded-md select-none overflow-hidden' 
        style={{background:"#fffa",backdropFilter:"blur(2px)"}}>
            <div onClick={()=>setShowInfo(!showInfo)}  className='flex justify-between w-full items-center cursor-pointer'>
                <p className=' font-bold'>Information</p>
                {!showInfo && <BiDownArrow className='pointer-events-none'/>}
                {showInfo && <BiUpArrow className='pointer-events-none'/>}
            </div>
            {
                showInfo &&
                <div className='flex flex-col justify-between gap-2 mt-2 ml-3'>
                {
                    Object.keys(info).map((k,i)=>
                    <div key={i} className='flex justify-between'>
                        <div className='flex justify-between overflow-hidden'>
                            <p>{k}</p>
                            <p>:</p>
                        </div>
                        <p>&nbsp;&nbsp;{metaData[k]}</p>
                    </div>)
                }
                </div>
            }
        </div>
    </div>
  )
}

export default React.memo(GUI)