import {useState} from 'react'
import { BiReset } from "react-icons/bi";
import { TbArrowAutofitWidth } from "react-icons/tb";


const MinMax = ({MinMaxChange, metaData}) => {
    const [minMax, setMinMax]=useState({min:metaData.Min, max:metaData.Max})
    const [show, setShow] = useState(false)
    const guiChanges=(e)=>{
        MinMaxChange(e)
    }

    const applyMinMax=()=>{
        guiChanges(["min_max",{minDis:parseFloat(minMax.min), maxDis:parseFloat(minMax.max)}])
        setShow(false)
    }

    const handleReset=()=>{
        let val=localStorage.getItem("minMax")
        if(val)
            val=JSON.parse(val)

            setMinMax({
                min:parseFloat(val.minDis),
                max:parseFloat(val.maxDis)
            })
    }
    return (
        <div className='h-fit relative'>
            <TbArrowAutofitWidth onClick={()=>setShow(!show)} className='bg-white p-2 text-4xl rounded-md cursor-pointer' />
            {show?
                <div className='absolute top-10 flex gap-4 flex-col rounded-xl p-4 text-md h-fit'
                    style={{background:"#fffa",backdropFilter:"blur(2px)"}}>
                    <div>
                        <label htmlFor="max">Max </label>
                        <input id='max' type='number' value={minMax.max} onChange={(e)=>setMinMax({...minMax, max:e.target.value})} className=' bg-gray-100 outline-none px-2 py-2 cursor-pointer rounded-md shadow-inner'/>
                    </div>
                    <div>
                        <label htmlFor="min">Min </label>
                        <input id="min" type='number' value={minMax.min} onChange={(e)=>setMinMax({...minMax, min:e.target.value})} className=' bg-gray-100 outline-none px-2 py-2 cursor-pointer rounded-md shadow-inner'/>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <BiReset onClick={handleReset} className=' bg-white p-2 text-4xl rounded-md cursor-pointer' />
                        <button onClick={applyMinMax} className='bg-white p-2 shadow-sm rounded-md w-full'>Apply</button>
                    </div>
                </div>
                :null
            }
        </div>
    )
}

export default MinMax