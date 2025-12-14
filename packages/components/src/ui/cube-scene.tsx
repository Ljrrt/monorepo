import { cn } from '@monorepo/common';

import { ReactNode, useRef }   from 'react';
import { Group }               from 'three';
import { Canvas, useFrame }    from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const PIXELS_PER_UNIT = 400;

interface Face {
  position: [number, number, number];
  rotation: [number, number, number];
}

type CubeFaces = [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];

const DEFAULT_COMPONENTS: CubeFaces = [
  <div className="size-full bg-red-600" />,
  <div className="size-full bg-blue-600" />,
  <div className="size-full bg-green-600" />,
  <div className="size-full bg-yellow-600" />,
  <div className="size-full bg-purple-600" />,
  <div className="size-full bg-cyan-600" />,
];

interface CubeProperties {
  percentage: number;
  children?:  CubeFaces;
  width?:     number;
  height?:    number;
}

function Cube(properties: CubeProperties) {
  const {
    percentage,
    children = DEFAULT_COMPONENTS,
    width = 2,
    height = 2,
  } = properties;

  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = -(percentage / 100) * 1.5 * Math.PI;
  });

  const faces: Face[] = [
    { position: [0, 0, width / 2], rotation: [0, 0, 0] }, // Front
    { position: [width / 2, 0, 0], rotation: [0, Math.PI / 2, 0] }, // Right
    { position: [0, 0, -width / 2], rotation: [0, Math.PI, 0] }, // Back
    { position: [-width / 2, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // Left
    { position: [0, height / 2, 0], rotation: [-Math.PI / 2, 0, 0] }, // Top
    { position: [0, -height / 2, 0], rotation: [Math.PI / 2, 0, 0] }, // Bottom
  ];

  return (
    <group ref={groupRef}>
      {faces.map((face, index) => (

        <mesh key={index} position={face.position} rotation={face.rotation}>
          <planeGeometry args={index < 4 ? [width, height] : [width, width]} />

          <meshBasicMaterial color="black" />

          <Html
            transform={true}
            pointerEvents="none"
            position={[0, 0, 0.001]}
            rotation={[0, 0, 0]}
            distanceFactor={1}
            prepend={true}
            className={cn('overflow-hidden')}
            occlude="blending"
            style={{
              width:  width * PIXELS_PER_UNIT,
              height: (index < 4 ? height : width) * PIXELS_PER_UNIT,
            }}
          >
            {children[index]}
          </Html>
        </mesh>
      ))}
    </group>
  );
}

interface SceneProperties {
  percentage: number;
  children?:  CubeFaces;
  width?:     number;
  height?:    number;
  className?: string;
}

export function CubeScene(properties: SceneProperties) {
  const {
    percentage,
    className,
    children,
    width,
    height,
  } = properties;

  return (

    <div className={cn('', className)}>

      <Canvas shadows={true}>

        <ambientLight intensity={2} />

        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 5, 5]} intensity={200} />

        <Cube
          percentage={percentage}
          children={children}
          height={height}
          width={width}
        />

        <OrbitControls
          minPolarAngle={-(Math.PI / 2)}
          maxPolarAngle={Math.PI}
          minAzimuthAngle={-0.5}
          maxAzimuthAngle={0.5}
          enableZoom={false}
        />

      </Canvas>

    </div>

  );
}
