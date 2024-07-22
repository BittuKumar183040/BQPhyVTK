import React, {useState} from 'react'
import { FaEquals, FaGreaterThan } from 'react-icons/fa'

const LimitVisibility = ({distance, limitVisible}) => {
    const [fn, setFn] = useState(">")
    const [value, setValue] = useState()
    return (
    <div className=' flex flex-col w-40 h-min rounded-lg m-0 bg-gray-100 gap-2 justify-between p-1'>
        <div className=' flex items-center gap-4 justify-between'>
            <div>
                <label className=' px-2' htmlFor='limit'>Limit :</label>
            </div>
            <div className=' flex gap-2'>
                <FaGreaterThan className=' p-1 text-xl hover:bg-gray-400 rounded-md cursor-pointer'/>
                <FaEquals className=' p-1 text-xl hover:bg-gray-400 rounded-md cursor-pointer'/>
                <FaGreaterThan className=' transform rotate-180 p-1 text-xl hover:bg-gray-400 rounded-md cursor-pointer'/>
            </div>
        </div>
        <input 
            min={distance.min}
            max={distance.max}
            type='number'
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className=' w-full border-2 shadow-inner px-2 border-gray-400 rounded-lg'
        />
    </div>
  )
}

export default LimitVisibility