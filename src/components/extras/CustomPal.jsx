import React, {useEffect, useState} from 'react'
import { BiExit, BiPlus } from 'react-icons/bi'
import { FaWindowClose } from 'react-icons/fa'

const ColorField = ({identity, defaultVal, change, remove}) => {
    const [color, setColor] = useState(defaultVal)

    const handleChange=(e)=>{
        let color="#"+e.target.value
        setColor(color)
        change(e)
    }
    const deleteHandle=()=>{
        remove(identity)
    }
    return (
        <div className='flex gap-1 relative items-center'>
            <p className='absolute left-2 '>#</p>
            <input
                id={identity}
                style={{width:'80px', border:`2px solid ${color}`}} 
                value={color.split("#").pop()} 
                onChange={handleChange}
                className=' outline-none pr-6 pl-5 rounded-sm bg-gray-300' 
                minLength={3} maxLength={6} 
                type='text' 
                placeholder='color'>
            </input>
            <div style={{background:color}} className={`flex items-center justify-around absolute right-0 h-full w-6`}>
                <FaWindowClose onClick={deleteHandle} style={{color:color}} className='filter invert cursor-pointer opacity-85'/>
            </div>
        </div>
    )
}



const CustomPal = ({custom}) => {
    const [name, setName] = useState("Custom")
    const initialState={
        name:"Custom",
        gradient:[]
    };
    const [colors, setColors]=useState(initialState)
    function isValidHexColor(color) {
        const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
        return hexRegex.test(color);
    }
    const onChange=(e)=>{
        let target=e.target
        let colorHEX="#"+target.value
        if(isValidHexColor(colorHEX)){
            colors.gradient[parseInt(target.id)]=colorHEX
            setColors({...colors})
        }
    }
    
    const addNew=()=>{
        colors.gradient[colors.gradient.length]="#"+"000"
        setColors({...colors})
    }
    const calculateColor=(hexArr)=>{
        let value=""
        hexArr.forEach((val)=>{
            value=value+", "+val;
        })
        return value
    }
    const onAdding=()=>{
        if(colors.gradient.length<=1){
            console.log("Add Color")
            return
        }
        colors.name=name
        custom(colors)
    }
    const remove=(e)=>{
        colors.gradient.splice(e, 1)
        setColors({...colors})
    }
    return (<>
        <div className='absolute left-full top-0 flex gap-1 flex-col bg-white p-2 rounded-r-md'>
            <p className=' text-xs text-center'>Enter HEX code</p><hr/>
            <input className='border-2 shadow-inner px-2 border-gray-400 rounded-lg text-sm' onMouseLeave={isValidHexColor} onChange={(e)=>setName(e.target.value)} type="text" value={name} placeholder='Name!'/>
            {
                colors.gradient.map((field, idx)=><ColorField key={idx} identity={idx} defaultVal={field} change={onChange} remove={remove}/>)
            }
            <div className='flex justify-center'>
                <BiPlus onClick={addNew} className=' bg-gray-400 rounded-full text-xl cursor-pointer'/>
            </div>
            <hr/>
            <div className='flex justify-between items-center'>
                {/* <BiExit className=' bg-gray-200 rounded-md p-1 text-2xl cursor-pointer'/> */}
                <p className=' cursor-pointer px-4 text-white' onClick={onAdding}
                style={{backgroundImage:`linear-gradient(to right ${calculateColor(colors.gradient)})`}}>ADD</p>    
            </div>
        </div>
    </>
  )
}

export default CustomPal