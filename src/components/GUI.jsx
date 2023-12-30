import React, { useEffect, useState } from 'react'

const GUI = ({changesMade, metaData}) => {
    const [active, setActive]=useState("surface")
    const [pointSize, setPointSize]=useState(1)
    // for(let key in metaData){
    //     console.log(key, metaData[key])
    // }
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

    const container={
        position:"absolute",
        gap:"5px",
        width:"170px", 
        left:"0", 
        top:"50%", 
        transform:"translateY(-50%)", 
        display:"flex", 
        flexDirection:"column",
        background:"rgba(255,255,255,0.2)",
        backdropFilter:"blur(5px)",
        borderRadius:"0 5px 5px 0",
        padding:"5px",
        fontSize:"15px",
    }
    const select={
        padding:"5px",
        border:"none",
        fontSize:"15px"
    }
    const options={
        padding:"5px",
        border:"none",
    }
    const infoPara={
        border:"1px solid rgba(0,0,0,0.2)", 
        margin:"0px", 
        padding:"4px 2px",
        color:"black",
        fontSize:"0.8em",
    }
    return (
    <div style={container}>
        {/* <div>
            <p>Color Map</p>
            <input type='text' value={value.min}/>
            <input type='text' value={value.max}/>
        </div> */}
        <select style={select} onChange={(e)=>guiChanges([e.target.value])}>
            <option style={options} value="displacement">Displacement</option>
            <option style={{padding:"5px"}} value="solid_color">Solid Color</option>
        </select>
        <select style={select} onChange={viewOptions}>
            <option style={options} value="surface">Surface</option>
            {/* <option style={options} value="surface_with_edges">Surface With Edges</option> */}
            <option style={options} value="points">Points</option>
            <option style={options} value="wireframe">Wireframe</option>
        </select>
        {
            active==="points"?
                <div style={{padding:0, margin:0}}>
                    <p style={{padding:0, margin:0}}>Size</p>
                    <input 
                        type='number'
                        style={{padding:0, margin:0, width:"100%", fontSize:"1em"}}
                        value={pointSize}
                        onChange={pointSizeChange}
                        min={1}
                    />
                </div>
            :null
        }
        <div>
            <hr/>
            <p style={{margin:0, padding:0}}>Information:</p>
            <div style={{display:"flex", flexDirection:"column", gap:"5px", marginTop:"5px"}}>
            {
                Object.keys(metaData).map((k,i)=><p style={infoPara} key={i}>{`${k} : ${metaData[k]}`}</p>)
            }
            </div>
            {/* <p>{metaData}</p> */}
        </div>
    </div>
  )
}

export default GUI