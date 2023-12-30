import toast, { Toaster } from 'react-hot-toast';

const FileUpload = ({vtkFileData}) => {
    const sendBack=(e)=>{
        if(e.name.split(".").pop()==="vtk"){
            vtkFileData(e)
        }
        else{
            toast.error("Not a valid file.")
            vtkFileData(false)
        }
    }

    const byChoose=(e)=>{
        e.preventDefault();
        sendBack(e.target.files[0])
    }
    const byDrop=(e)=>{
        e.preventDefault();
        sendBack(e.dataTransfer.files[0])
    }
  return (<>
    <Toaster/>
    <div className='relative w-fit top-1/2 left-1/2 bg-gray-200 rounded-lg shadow-2xl p-4 flex flex-col justify-center items-center overflow-hidden
         outline outline-8 outline-gray-300'
        style={{transform:"translate(-50%, -50%)"}}>
        <img className="h-20 opacity-70" src='./upload.png'/>
        <input type='file' 
            title="Choose VTK file"
            className='absolute left-0 top-0 bg-slate-700 w-full h-full opacity-0 cursor-pointer'
            multiple 
            onChange={byChoose}
            onDrop={byDrop}/>
        <h4 className='pt-4 text-md font-bold text-gray-700'>Select or Drop the VTK</h4>  
    </div>
  </>
  )
}

export default FileUpload