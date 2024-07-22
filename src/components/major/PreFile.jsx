import React, {useEffect, useState} from 'react'
import VtkRendering from '../../VtkRendering'
import Timeline from '../Timeline/Timeline'


const PreFile = ({allData}) => {
    const [items, setItems] = useState([...allData])
    const [active, setActive] = useState(allData[0])
    const activeDom=document.getElementById(active.id)
    console.log(allData)
    if(activeDom){
        document.querySelectorAll(".timelineItem").forEach((item)=>{
            item.style.background="white"
        })
        activeDom.style.background="green"
    }
    return (
        <>
            <Timeline items={items} setItems={setItems} setActive={setActive}/>
            <VtkRendering vtkData={active}/>
        </>

    )
}

export default PreFile