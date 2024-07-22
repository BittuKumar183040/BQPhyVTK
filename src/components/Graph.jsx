import React, {useState} from "react";
const Graph = ({colorPalette, distance}) => {
    let minDis=distance.Min;
    let maxDis=distance.Max;
    function toScientificNotation(number) {
        return number.toExponential(1);
    }
    let maxVal=parseFloat(maxDis.toFixed(4))
    let scientificMax=toScientificNotation(maxDis)
    // let minVal=parseFloat(minDis.toFixed(4))
    let scientificMin=toScientificNotation(minDis)
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
    let value=""
    colorPalette.forEach((val)=>{
        value=value+", "+val;
    })
    function generateValues(minVal, maxVal, n) {
        const step = (maxVal - minVal) / (n - 1);
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push(minVal + i * step);
        }
        return result;
    }
    const midValueSimplify=(val)=>{
        let calculated=parseFloat(val.toFixed(5))
        if(calculated>1)
           return Math.floor(calculated)
        return calculated
    }
    const [midVal, setMidVal]=useState(7)
    
    // click and drag event expand
    const [size, setSize] = useState(40)
    let draggedElement;
    const mouseDownHandle= event => {
        draggedElement = event.target;
    }
    document.addEventListener('mousemove', e=>{
        if(draggedElement){
            let val=100 - (e.clientY / e.view.innerHeight * 100)
            setMidVal(parseInt(val/10)+3)
            setSize(val)
        }
    })
    document.addEventListener('mouseup', event => {
        // console.log(event)
        draggedElement = null;
    });
    return (
    <div style={{
        position:'absolute', 
        right:'40px', 
        bottom:"0px",
        height:size+"vh",
        minHeight:"98px",
        maxHeight:"85vh",
        borderBottom:"4px solid transparent",
        userSelect:"none"
        }}
        >
            <div className='absolute -top-0 bg-white shadow-md h-1 w-full z-10 cursor-n-resize'
                onMouseDown={mouseDownHandle} 
            >
            </div>
            <div className='flex flex-col justify-between h-full'
            style={{
                    width:"80px", 
                    backgroundImage:`linear-gradient(to top ${value})`,
                    backgroundSize:"30% 100%",
                    backgroundRepeat:"no-repeat"}}>
                <div className=" opacity-90">
                    <div style={line()}></div>
                    <p title={maxDis} className='text-lg font-bold text-white text-right'>{scientificMax}</p>
                </div>
                {
                    generateValues(maxVal, minDis, midVal).map((val, idx)=>{
                        if(idx===0 || idx===midVal-1){return null};
                        return(
                            <p 
                                key={idx}
                                title={val}
                                className='text-md font-bold text-white text-right opacity-85'>
                                {midValueSimplify(val)}
                            </p>
                        )
                    })
                }
                <div className=" opacity-90">
                    <p title={minDis} className='text-lg font-bold text-white text-right'>{scientificMin}</p>
                    <div style={line()}></div>
                </div>
            </div>
    </div>
  )
}

export default Graph