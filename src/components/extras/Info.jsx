import React, {useState} from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

const Info = () => {
    const [ expand, setExpand] = useState(false)

    const Element=({title, logoSVG})=><div className='flex justify-between  py-2 '><span>{title} : </span>{logoSVG}</div>

    return (
        <>
        <div onClick={()=>setExpand(!expand)} className=' absolute right-2 top-2 z-10 text-2xl text-gray-600 select-none cursor-pointer'>
            {expand?<IoCloseCircle />:<FaInfoCircle />}
        </div>
        {expand?
        <div className=' absolute right-2 top-2 flex gap-1 w-32 flex-col rounded-xl shadow-lg p-2 text-md bg-gray-200 opacity-60 select-none pointer-events-none'
            style={{backdropFilter:"blur(2px)"}}>
            <div>
                <div className='flex justify-between w-full items-center'>
                    <p className=' font-medium'>Information</p>
                </div>
            </div>
            <Element title="Pan" logoSVG={
                <svg version="1.0" 
                    width="20px" height="20px" 
                    viewBox="0 0 350 350"
                    stroke="#000">
                    <g id="SVGRepo_bgCarrier"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> 
                    <path d="M181.563,0C120.762,0,59.215,30.525,59.215,88.873V237.5c0,65.658,53.412,119.071,119.071,119.071 c65.658,0,119.07-53.413,119.07-119.071V88.873C297.356,27.809,237.336,0,181.563,0z M274.945,237.5 c0,53.303-43.362,96.657-96.659,96.657c-53.299,0-96.657-43.354-96.657-96.657v-69.513c20.014,6.055,57.685,15.215,102.221,15.215 c28.515,0,59.831-3.809,91.095-14.567V237.5z M274.945,144.794c-81.683,31.233-168.353,7.716-193.316-0.364V88.873 c0-43.168,51.489-66.46,99.934-66.46c46.481,0,93.382,20.547,93.382,66.46V144.794z M190.893,48.389v81.248 c0,6.187-5.023,11.208-11.206,11.208c-6.185,0-11.207-5.021-11.207-11.208V48.389c0-6.186,5.021-11.207,11.207-11.207 C185.869,37.182,190.893,42.203,190.893,48.389z M154.938,40.068V143.73c-15.879,2.802-62.566-10.271-62.566-10.271 C80.233,41.004,154.938,40.068,154.938,40.068z"/> </g> </g>
                </svg>}
            />
            <Element title="Rotate" logoSVG={
                <svg version="1.0" 
                    width="20px" height="20px" 
                    viewBox="0 0 350 350"
                    stroke="#000"
                    transform="matrix(-1, 0, 0, 1, 0, 0)">
                    <g id="SVGRepo_bgCarrier"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> 
                    <path d="M181.563,0C120.762,0,59.215,30.525,59.215,88.873V237.5c0,65.658,53.412,119.071,119.071,119.071 c65.658,0,119.07-53.413,119.07-119.071V88.873C297.356,27.809,237.336,0,181.563,0z M274.945,237.5 c0,53.303-43.362,96.657-96.659,96.657c-53.299,0-96.657-43.354-96.657-96.657v-69.513c20.014,6.055,57.685,15.215,102.221,15.215 c28.515,0,59.831-3.809,91.095-14.567V237.5z M274.945,144.794c-81.683,31.233-168.353,7.716-193.316-0.364V88.873 c0-43.168,51.489-66.46,99.934-66.46c46.481,0,93.382,20.547,93.382,66.46V144.794z M190.893,48.389v81.248 c0,6.187-5.023,11.208-11.206,11.208c-6.185,0-11.207-5.021-11.207-11.208V48.389c0-6.186,5.021-11.207,11.207-11.207 C185.869,37.182,190.893,42.203,190.893,48.389z M154.938,40.068V143.73c-15.879,2.802-62.566-10.271-62.566-10.271 C80.233,41.004,154.938,40.068,154.938,40.068z"/> </g> </g>
                </svg>
            }
            />
            <Element title="Zoom" logoSVG={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 21" fill="none">
                <path d="M7.6249 0C11.0992 0 14.6162 1.74429 14.6162 5.07846V13.5714C14.6162 17.3233 11.5641 20.3755 7.81215 20.3755C4.06027 20.3755 1.00815 17.3233 1.00815 13.5714V5.07846C1.00815 1.58909 4.43787 0 7.6249 0ZM2.28878 13.5714C2.28878 16.6173 4.76661 19.0947 7.81215 19.0947C10.8578 19.0947 13.3354 16.6173 13.3354 13.5714V9.59926C12.1918 9.94526 10.0391 10.4687 7.49421 10.4687C5.86478 10.4687 4.0753 10.251 2.28878 9.63629V13.5714ZM2.28878 8.27394C6.95638 10.0587 11.909 8.71486 13.3354 8.25314V5.07846C13.3354 2.61171 10.3932 1.28074 7.6249 1.28074C4.96884 1.28074 2.28878 2.45486 2.28878 5.07846V8.27394ZM7.09175 2.76509V7.40783C7.09175 7.76137 7.37878 8.04829 7.7321 8.04829C8.08553 8.04829 8.3725 7.76137 8.3725 7.40783V2.76509C8.3725 2.4116 8.08558 2.12469 7.7321 2.12469C7.37884 2.12469 7.09175 2.4116 7.09175 2.76509Z" fill="black"/>
                </svg>
            }
            />
        </div>
        :null}
    </>
  )
};

export default React.memo(Info)