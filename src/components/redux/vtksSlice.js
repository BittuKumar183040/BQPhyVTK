import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:[{
        id:0,
        Name:null,
        Size:0.0,
        Type:"Unstructured Grid",
        Cells:"",
        Points:"",
        Min:0,
        Max:0,
        Data:"rawData",
        calculated:{}
    }],
    active:0
}

const vtksSlice = createSlice({
  name: 'vtkData',
  initialState,
  reducers: {
    setInitial: (state, action) => {
        state.data=action.payload
    },
    setOuterValue: (state, action)=>{
        state.data[action.payload.id]=[{
            ...state.data[action.payload.id], 
            Points:action.payload.changes.Points,
            Cells:action.payload.changes.Cells,
            Min:action.payload.changes.Min,
            Max:action.payload.changes.Max,

            calculated:action.payload.calculated
        }]
    },
    setActive:(state, action)=>{
        state.active=0
    }
  },
})

export const { setInitial, setOuterValue, setActive} = vtksSlice.actions
export default vtksSlice.reducer