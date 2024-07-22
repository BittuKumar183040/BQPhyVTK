import React,{ useRef } from 'react';
import { MOUSE, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport } from '@react-three/drei';


const CameraManipulation = ({dimension}) => {
    const {gl, camera} = useThree();
    const controlsRef = useRef();
    return <>
        <OrbitControls 
                mouseButtons={{
                    LEFT: MOUSE.PAN,
                    RIGHT: MOUSE.ROTATE,
                    MIDDLE: MOUSE.DOLLY,
                }}
                ref={controlsRef} 
                makeDefault={false} 
                zoomSpeed={3} 
                dampingFactor={0.25} 
                enableDamping
                enableRotate={dimension}
                args={[camera, gl.domElement]}
            />
        <GizmoHelper alignment="bottom-left" margin={[95, 95]}>
            <group scale={new Vector3(0.85,0.85,0.85)}>
                <GizmoViewport disabled={true} hideNegativeAxes={true} labelColor="white" labels={dimension?["X", "Y", "Z"]:["X", "Y", ""]} axisHeadScale={1}/>
            </group>
            <group scale={new Vector3(1.5, 1.5, 1.5)}>
                <GizmoViewcube textColor='black' opacity={0.8} strokeColor='blue' />
            </group>
        </GizmoHelper>
        
        </>
}

export default React.memo(CameraManipulation)
