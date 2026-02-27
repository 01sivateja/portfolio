import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'

const mouseState = { x: 0, y: 0, isHovering: false }

function ParticleField() {
    const ref = useRef()
    const particleCount = 5000

    const positions = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return positions
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.02
            ref.current.rotation.y += delta * 0.03
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

function BouncingShape({ geometry, color, initialPosition, speed, size }) {
    const meshRef = useRef()
    const velocityRef = useRef({
        x: (Math.random() - 0.5) * speed * 2,
        y: (Math.random() - 0.5) * speed * 2,
        z: (Math.random() - 0.5) * speed,
    })

    const positionRef = useRef({
        x: initialPosition[0],
        y: initialPosition[1],
        z: initialPosition[2],
    })

    const bounds = { x: 8, y: 5, z: 4 }

    useFrame((state, delta) => {
        if (meshRef.current) {
            const vel = velocityRef.current
            const pos = positionRef.current

            pos.x += vel.x * delta
            pos.y += vel.y * delta
            pos.z += vel.z * delta

            if (pos.x > bounds.x || pos.x < -bounds.x) {
                vel.x *= -1
                pos.x = Math.max(-bounds.x, Math.min(bounds.x, pos.x))
            }
            if (pos.y > bounds.y || pos.y < -bounds.y) {
                vel.y *= -1
                pos.y = Math.max(-bounds.y, Math.min(bounds.y, pos.y))
            }
            if (pos.z > bounds.z || pos.z < -bounds.z - 2) {
                vel.z *= -1
                pos.z = Math.max(-bounds.z - 2, Math.min(bounds.z, pos.z))
            }

            meshRef.current.position.set(pos.x, pos.y, pos.z)
            meshRef.current.rotation.x += delta * 0.8
            meshRef.current.rotation.y += delta * 0.6
            meshRef.current.rotation.z += delta * 0.4
        }
    })

    const renderGeometry = () => {
        switch (geometry) {
            case 'icosahedron':
                return <icosahedronGeometry args={[size, 0]} />
            case 'octahedron':
                return <octahedronGeometry args={[size, 0]} />
            case 'tetrahedron':
                return <tetrahedronGeometry args={[size, 0]} />
            case 'dodecahedron':
                return <dodecahedronGeometry args={[size, 0]} />
            default:
                return <sphereGeometry args={[size, 8, 8]} />
        }
    }

    return (
        <mesh ref={meshRef} position={initialPosition}>
            {renderGeometry()}
            <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
    )
}

function ScatteredGeometries() {
    const shapes = useMemo(() => {
        const geometries = ['icosahedron', 'octahedron', 'tetrahedron', 'dodecahedron']
        const colors = ['#6366f1', '#06b6d4', '#8b5cf6', '#a855f7']
        const shapeData = []

        for (let i = 0; i < 6; i++) {
            shapeData.push({
                id: i,
                geometry: geometries[Math.floor(Math.random() * geometries.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                initialPosition: [
                    (Math.random() - 0.5) * 14,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6 - 2,
                ],
                speed: 0.8 + Math.random() * 1.2,
                size: 0.4 + Math.random() * 0.4,
            })
        }

        return shapeData
    }, [])

    return (
        <>
            {shapes.map((shape) => (
                <BouncingShape
                    key={shape.id}
                    geometry={shape.geometry}
                    color={shape.color}
                    initialPosition={shape.initialPosition}
                    speed={shape.speed}
                    size={shape.size}
                />
            ))}
        </>
    )
}

function GlowingStar() {
    const groupRef = useRef()
    const innerGlowRef = useRef()
    const outerGlowRef = useRef()

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouseState.x = (event.clientX / window.innerWidth) * 2 - 1
            mouseState.y = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        if (groupRef.current) {
            const targetX = mouseState.x * 5
            const targetY = mouseState.y * 3

            groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.15
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.15
            groupRef.current.rotation.z = time * 0.5
        }

        if (innerGlowRef.current) {
            const pulse = 1 + Math.sin(time * 4) * 0.2
            innerGlowRef.current.scale.setScalar(pulse)
            innerGlowRef.current.material.opacity = 0.6 + Math.sin(time * 4) * 0.2
        }

        if (outerGlowRef.current) {
            const pulse = 1 + Math.sin(time * 3) * 0.15
            outerGlowRef.current.scale.setScalar(pulse)
            outerGlowRef.current.material.opacity = 0.2 + Math.sin(time * 3 + 1) * 0.1
        }
    })

    const starShape = useMemo(() => {
        const shape = new THREE.Shape()
        const outerRadius = 0.12
        const innerRadius = 0.05
        const points = 5

        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius
            const angle = (i * Math.PI) / points - Math.PI / 2
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            if (i === 0) {
                shape.moveTo(x, y)
            } else {
                shape.lineTo(x, y)
            }
        }

        shape.closePath()
        return shape
    }, [])

    return (
        <group ref={groupRef} position={[0, 0, 1]}>
            <mesh>
                <shapeGeometry args={[starShape]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            <mesh ref={innerGlowRef} scale={1.3}>
                <shapeGeometry args={[starShape]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>

            <mesh ref={outerGlowRef} scale={1.8}>
                <shapeGeometry args={[starShape]} />
                <meshBasicMaterial color="#e0f2fe" transparent opacity={0.25} />
            </mesh>

            <mesh scale={2.5}>
                <shapeGeometry args={[starShape]} />
                <meshBasicMaterial color="#bfdbfe" transparent opacity={0.1} />
            </mesh>
        </group>
    )
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent', pointerEvents: 'none' }}
            >
                <ambientLight intensity={0.5} />
                <ParticleField />
                <ScatteredGeometries />
                <GlowingStar />
            </Canvas>
        </div>
    )
}