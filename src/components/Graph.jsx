import React from 'react'

const Graph = ({minDis, maxDis}) => {
    let num=parseFloat(maxDis.toFixed(5))
    let scientific=num.toExponential();
    const line=(width="100%", color="white")=>{
        return({
            position:"relative",
            left:"0",
            height:"2px",
            width:width,
            borderRadius:"5px",
            background:color,
        })
    }
    const text={
        fontSize:"15px",
        margin:"0px",
        padding:"2px",
        fontWeight:"bold",
        textAlign:"right",
        color:"white"
    }
  return (
    <div style={{
        position:'absolute', 
        right:'40px', 
        top:"50%", 
        width:"80px", 
        transform:"translateY(-50%)",
        height:"80%",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
        backgroundImage:"linear-gradient(to top, red, white ,blue)",
        backgroundSize:"30% 100%",
        backgroundRepeat:"no-repeat"
        }}>
            <div>
                <div style={line()}></div>
                <p title={num} style={text}>{scientific}</p>
            </div>
            <div style={{position:"relative"}}>
                <p title={(num/2).toExponential()} style={{color:"white",position:"absolute", top:"-20px", right:"0", width:"69%", textAlign:"right", overflow:'hidden'}}>{num/2}</p>
                <div style={line("15px", "black")}></div>
            </div>
            <div>
                <p title={minDis} style={text}>{minDis.toExponential()}</p>
                <div style={line()}></div>
            </div>
            <div style={{position:"absolute", left:"-35px",top:"75%", transform:" translateY(-50%) rotate(-90deg)", textAlign:"center", width:"250px", color:"white", fontWeight:"bold", fontSize:"1.1em", letterSpacing:"1px"}} >
                <p>Displacement Magnitude</p>
            </div>
    </div>
  )
}

export default Graph