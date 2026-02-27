import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'

const skills = [
    'Python', 'SQL', 'PyTorch', 'TensorFlow', 'Scikit-learn',
    'LLMs', 'Prompt Engineering', 'GPT-4 APIs', 'HuggingFace',
    'NLP', 'OCR', 'Anomaly Detection', 'FastAPI', 'REST APIs',
    'AWS SageMaker', 'GCP', 'Docker', 'Kubernetes', 'MLflow', 'CI/CD'
]

function SkillTag({ text, position, color }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            ref.current.lookAt(state.camera.position)
        }
    })

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={0.15}
            color={color}
            anchorX="center"
            anchorY="middle"
        >
            {text}
        </Text>
    )
}

function SkillCloud() {
    const groupRef = useRef()

    const skillPositions = useMemo(() => {
        const positions = []
        const radius = 2.5
        const phi = Math.PI * (3 - Math.sqrt(5))

        skills.forEach((skill, i) => {
            const y = 1 - (i / (skills.length - 1)) * 2
            const radiusAtY = Math.sqrt(1 - y * y) * radius
            const theta = phi * i

            positions.push({
                text: skill,
                position: [
                    Math.cos(theta) * radiusAtY * radius,
                    y * radius,
                    Math.sin(theta) * radiusAtY * radius
                ],
                color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'
            })
        })

        return positions
    }, [])

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {skillPositions.map((skill, index) => (
                <SkillTag key={index} {...skill} />
            ))}
            <mesh>
                <sphereGeometry args={[2.3, 32, 32]} />
                <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    )
}

function ConnectionLines() {
    const linesRef = useRef()

    const linePositions = useMemo(() => {
        const positions = []
        const count = 50

        for (let i = 0; i < count; i++) {
            const theta1 = Math.random() * Math.PI * 2
            const phi1 = Math.acos(2 * Math.random() - 1)
            const theta2 = Math.random() * Math.PI * 2
            const phi2 = Math.acos(2 * Math.random() - 1)
            const r = 2.3

            positions.push(
                r * Math.sin(phi1) * Math.cos(theta1),
                r * Math.cos(phi1),
                r * Math.sin(phi1) * Math.sin(theta1),
                r * Math.sin(phi2) * Math.cos(theta2),
                r * Math.cos(phi2),
                r * Math.sin(phi2) * Math.sin(theta2)
            )
        }

        return new Float32Array(positions)
    }, [])

    useFrame((state, delta) => {
        if (linesRef.current) {
            linesRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={linePositions.length / 3}
                    array={linePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
        </lineSegments>
    )
}

export default function SkillGlobe() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(max-width: 768px)')
        const update = () => setIsMobile(media.matches)
        update()
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    return (
        <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
            <Canvas camera={{ position: [0, 0, isMobile ? 6.8 : 6], fov: isMobile ? 66 : 60 }}>
                <ambientLight intensity={isMobile ? 0.45 : 0.5} />
                <pointLight position={[10, 10, 10]} />
                <SkillCloud />
                {!isMobile && <ConnectionLines />}
                <OrbitControls
                    enableZoom={!isMobile}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={isMobile ? 0.35 : 0.5}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    )
}
