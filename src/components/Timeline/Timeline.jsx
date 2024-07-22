import React,{useMemo, useState} from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TiMediaPlay, TiMediaPause, TiMediaRecord } from "react-icons/ti";
import VtkFile from './VtkFile';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

let fromStart;
let time=1000;

const Timeline = ({items, setItems, setActive}) => {
    const [show, setShow] = useState(false)
    const [play, setPlay] = useState(false)
    // const [currentItem, setCurrentItem]=useState(0)
    const getTaskPos = id => items.findIndex(item => item.id === id)

    const handleDragEnd=(event)=>{
        const {active, over} = event;
        if(active.id === over.id) return;
        setItems(item =>{
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)
            return arrayMove(item, originalPos, newPos)
        })
    }
    let current=0;
    // useEffect(()=>{
    //     let timeLoop=setInterval(()=>{
    //         if(current===items.length-1){
    //             // clearInterval(timeLoop)
    //             current=0
    //         }
    //         else{
    //             current++
    //         }
    //         setActive(items[current])
            
    //     },1000)
    // },[items])
    const playPauseAnimation=(play)=>{
        if(play){
            fromStart=setInterval(()=>{
                if(current===items.length-1){
                    // clearInterval(timeLoop)
                    current=0
                }
                else{
                    current++
                }
                setActive(items[current])
                // setCurrentItem(current)
                },time)
        }
        else{
            clearInterval(fromStart)
        }

    }

    const handlePlay=()=>{
        setPlay(true)
        playPauseAnimation(true)
    }
    const handlePause=()=>{
        setPlay(false)
        playPauseAnimation(false)
        
    }
    const handleTime=(val)=>{
        if(play) handlePause()
        time=val*1000
    }
    const marker=useMemo(()=>{
        return <div className=' opacity-80 absolute top-0 h-full w-1 bg-green-400 '
            style={{left:45+(45*2*current)+"px"}}>
            </div>
    }, current)
    return (
        <div className=' absolute flex flex-col bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 z-50'>
            <div className='flex justify-between items-center border-b-2 border-gray-800'>
                <p onClick={()=>setShow(!show)} 
                    className=' text-md tracking-wider rounded-t-md bg-gray-800 px-4 py-2 text-white inline-block cursor-pointer'>Timeline</p>
                <div className='flex text-2xl p-1 flex-1'>
                    {play? <TiMediaPause onClick={handlePause} /> : <TiMediaPlay onClick={handlePlay}/>}
                    {/* {<TiMediaRecord onClick={()=>setPlay(0)}/> } */}
                </div>
                <div className='flex gap-2 mr-2 items-center bg-white rounded-md cursor-not-allowed overflow-hidden'>
                    <input className=' w-8 outline-none cursor-not-allowed text-right bg-gray-200 px-1' type='text' value={time/1000} onChange={(e)=>handleTime(e.target.value)} disabled/>
                    <strong className='cursor-not-allowed pr-1 text-md text-gray-800'>FPS</strong>
                </div>
                {show?
                    <FaAngleDown onClick={()=>setShow(!show)} className=' text-2xl text-gray-800 inline-block cursor-pointer' />
                    :<FaAngleUp onClick={()=>setShow(!show)} className=' text-2xl text-gray-800 inline-block cursor-pointer' />
                }
            </div>
            {
                show?
                <DndContext  modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <div className=' h-20 text-center flex overflow-x-scroll' style={{background:"rgba(255, 255, 255, 0.667)", backdropFilter:"blur(2px)"}}>
                        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
                        {items.map((div, index)=>
                            <VtkFile key={div.id} item={div} id={div.id} name={div.Name} setActive={setActive}/>
                        )}
                        </SortableContext>
                        {/* {marker} */}
                </div>
                </DndContext>
                :null
            }
        </div>
    )
}

export default Timeline;