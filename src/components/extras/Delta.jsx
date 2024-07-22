import React, { useState } from 'react'

export const InputField=({label="", placeholder})=>{
    return(
        <div>
            <label htmlFor={label}>{label}: </label>
            <input id={label} placeholder={placeholder} className='w-20 px-1 outline-none rounded' type='text' />
        </div>
    )
}

export const Delta = ({dimension, setDeltaBack}) => {
    const [show, setShow] = useState(false)
    const [delta, setDelta]=useState({x:0,y:0,z:0})
    const checkValue=(val)=>{
        let temp=parseFloat(val)
        if(isNaN(temp)){
            return 0;
        }
        return temp;
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        let x=e.target[0].value;
        let y=e.target[1].value;
        let z=e.target[2].value;
        setDelta({
            ...delta, 
            x:checkValue(x),
            y:checkValue(y),
            z:dimension?checkValue(z):0,
        })
        setDeltaBack({x:checkValue(x), y:checkValue(y), z:dimension?checkValue(z):0})
        setShow(false)
    }
    return (
    <div className=' flex flex-col gap-2'>
        <div onClick={()=>setShow(!show)} className='flex w-fit h-9 px-2 cursor-pointer bg-white items-center rounded-md'>
            <p>Delta</p>
        </div>
        {show &&
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 bg-gray-200 p-1 rounded-md'>
            <InputField label={"x"} placeholder={delta.x}/>
            <InputField label={"y"} placeholder={delta.y}/>
            {dimension && <InputField label={"z"} placeholder={delta.z}/>}
            <input type='submit' value={"Apply"} class="bg-white p-2 shadow-sm rounded-md w-full cursor-pointer"/>
        </form>
        }
    </div>
  )
}
