import React, {useState} from 'react'
import { AiOutlineRotateLeft, AiOutlineRotateRight } from "react-icons/ai";

const CameraGUI = ({changeRotate}) => {
    const [rotate, setRotate] = useState([0,0,0]) 
    const handleRotate=(arr)=>{
        const resultVector = arr.map((value, index) => value + rotate[index]);
        setRotate(resultVector)
        changeRotate(resultVector)
    }
    return (
        <div className='flex gap-2 flex-row'>
            <AiOutlineRotateLeft 
                className='  bg-white p-2 text-4xl rounded-md cursor-pointer' 
                onClick={()=>handleRotate([0,0,90])}/>

            <AiOutlineRotateRight 
                className='  bg-white p-2 text-4xl rounded-md cursor-pointer' 
                onClick={()=>handleRotate([0,0,-90])}/>
        </div>
    )
}

export default React.memo(CameraGUI)