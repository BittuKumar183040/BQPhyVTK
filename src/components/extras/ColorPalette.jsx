import React, {useState} from 'react'
import { PiGradientFill } from "react-icons/pi";
import CustomPal from './CustomPal';

const initialPalettes=[
    {
        name:"Cool to Warm",
        gradient:["#00f", "#fff", "#f00"]
    },
    {
        name:"Cool to Warm (Extended)",
        gradient:["#fff", "#03004E", "#4E0000"]
    },
    {
        name:"Black-Body (Radiation)",
        gradient:["#fff", "#f00", "#000"]
    },
    {
        name:"X Ray",
        gradient:["#fff", "#000"]
    },
    {
        name:"Inferno (matplotlib)",
        gradient:["#03004E", "#300979", "#700979", "#F2FA09", "#fff"]
    },

]

const ColorPalette = ({changePalettes}) => {
    const [activeColor, setActiveColor] = useState(["#00f", "#fff", "#f00"])
    const [showCustom, setShowCustom] = useState(false)
    const [show, setShow]=useState(false);
    const [palettes, setPalettes]=useState(initialPalettes)
    const calculateColor=(hexArr)=>{
        let value=""
        hexArr.forEach((val)=>{
            value=value+", "+val;
        })
        return value
    }

    const handleColorChange=(val)=>{
        setActiveColor(val)
        setShow(false)
        changePalettes(val)
    }
    const customAdded=(item)=>{
        setPalettes((e)=>[...e, item])
        setShowCustom(false)
    }
    return (<div className='h-fit relative'>
        <div>
            <PiGradientFill onClick={()=>setShow(!show)} className='p-2 text-4xl rounded-md cursor-pointer'
                style={{backgroundImage:`linear-gradient(to right ${calculateColor(activeColor)})`}}/>
        </div>
        {show?
            <div className='bg-white p-1 rounded-md absolute top-10 w-48 -left-1/2 flex flex-col gap-1 justify-center'>
                {
                    palettes.map((val, idx)=>
                    <div key={idx} onClick={()=>handleColorChange(val.gradient)} className='rounded-sm h-8 flex items-center cursor-pointer'
                        style={{backgroundImage:`linear-gradient(to right ${calculateColor(val.gradient)})`}}>
                        <p className='bg-white px-1 rounded-r-md text-xs'>{val.name}</p>
                    </div>
                )
                }
                <div className='flex justify-around'>
                    <p className='text-sm cursor-pointer px-2 py-1 bg-gray-300' onClick={()=>setShowCustom(!showCustom)}>Create Custom</p>
                </div>
                {
                    showCustom && (<CustomPal custom={customAdded}/>)
                }
          </div>
        :null
        }

    </div>

    )
}

export default ColorPalette;