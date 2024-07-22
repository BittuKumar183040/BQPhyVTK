import React, {useState} from 'react'
import {FaCode} from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

const VtkFile = ({item, id, name, setActive}) => {
    const [hideMesh, setHideMesh] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id})

    const style = {
        background:id?"white":"green",
        transition, 
        transform:CSS.Transform.toString(transform),
    }
    const getSimplifiedName=(val)=>{
        const name=val.split(".").slice(0,-1).join(".")
        if(name.length>15){
            return name.slice(0,6)+"..."+name.slice(-5)
        }
        return name
    }
    const handleClick=()=>{
        setActive(item)   
    }

    return (
        <div id={id} onDoubleClick={handleClick} ref={setNodeRef} {...attributes} {...listeners} 
            style={style} 
            className={`${hideMesh?"opacity-50" : "opacity-100"} timelineItem cursor-move w-36 flex flex-col justify-between select-none border-2 border-gray-400 bg-white p-2 rounded-md shadow-sm`}>
            
            <p className='text-md inline-block '>{getSimplifiedName(name)}</p>
            {/* <div className='flex justify-between'>
                {hideMesh?
                    <BiSolidHide onClick={()=>setHideMesh(!hideMesh)} className=' bg-gray-400 text-white p-2 text-4xl rounded-md cursor-pointer'/>
                    :<BiSolidShow onClick={()=>setHideMesh(!hideMesh)} className=' bg-gray-400 text-white p-2 text-4xl rounded-md cursor-pointer'/>
                }
                <FaCode className=' bg-gray-600 text-white p-2 text-4xl rounded-md cursor-pointer' />
            </div> */}
        </div>
    )
}

export default VtkFile