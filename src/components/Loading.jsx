const Loading = () => {
    const style={
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)",
        zIndex:"999",
        background:"gray",
        padding:"10px 40px",
    }
    return (
        <div style={style}>Loading...</div>
    )
}

export default Loading