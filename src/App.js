import { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import VtkRendering from './VtkRendering';

const App = () => {
    const [vtkData, setVtkData]=useState(false);
    const [data, setData]=useState(0);
    const [metaData, setMetaData]=useState(0)
    const vtkFileData=(e)=>{
        if(e){
            setMetaData({name:e.name, size:`${Math.floor(e.size/1024)} KB`})
            const fileReader = new FileReader();
            fileReader.onload=()=>{
                const fileContents = fileReader.result;
                setData(fileContents)
            }
            fileReader.readAsText(e);
        }
    }
    useEffect(()=>{
        if(data){
            setVtkData(true)
        }
    },[data])
  return (
    <>
        {
           !vtkData?<FileUpload vtkFileData={vtkFileData}/>
        //    :<FileUpload vtkFileData={vtkFileData}/>
              :<VtkRendering vtkMetaData={metaData} vtkData={data}/>
        }
    </>
  )
}

export default App