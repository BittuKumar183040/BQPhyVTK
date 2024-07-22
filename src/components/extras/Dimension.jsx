import React, {useState} from 'react'

const Dimension = ({dimension}) => {
    const [dim, setDim] = useState(dimension)
    return (
        <div className='flex gap-2 flex-row h-9 px-2 bg-white items-center rounded-md'>
            <p className=' font-bold cursor-pointer'>{dim?"2D":"3D"}</p>
        </div>
    )
}

export default Dimension;