import { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import PreFile from './components/major/PreFile';

import { useDispatch, useSelector } from 'react-redux';
import { setInitial } from './components/redux/vtksSlice';

const App = () => {
    const [vtkData, setVtkData]=useState(false);
    const [data, setData]=useState([]);
    const [len, setLength]=useState(null);
    const dispatch=useDispatch()
    let metaData={name:"Trial", size:"Trial KB"}
    const checkFileSize=(e)=>{
        let val=Math.floor(e/1024);
        return val?`${val} KB`:`${e} Bytes`;
    }
    const vtkFileData = (filesList)=>{
        if(filesList){
            let len=filesList.length
            setLength(len)
            // for (const file of filesList) {
            for (let i = 0; i < len; i++) {
                const fileReader = new FileReader();
                fileReader.onload=()=>{
                    const fileContents = fileReader.result;
                    const disc={
                        visible:true,
                        id:i,
                        Name:filesList[i].name,
                        Size:checkFileSize(filesList[i].size),
                        Type:"Unstructured Grid",
                        Cells:"",
                        Points:"",
                        Min:null,
                        Max:null,
                        Data:fileContents
                    }
                    setData(current=>[...current, disc])
                }
                fileReader.readAsText(filesList[i]);
            }
        }
        else{
            console.log("No file found")
        }
    }
    useEffect(()=>{
        if(len===data.length){
            dispatch(setInitial(data))
            setVtkData(true)
        }
    },[data])
  return (
    <>
        {
           !vtkData?
           <FileUpload vtkFileData={vtkFileData}/>
        //    :console.log(data)\
              :<PreFile allData={data}/>
            // :null
        }
    </>
  )
}

export default App