import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function InteractiveCard({ children, className = '' }) {
    const ref = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg'])

    const handleMouseMove = (e) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className={`relative ${className}`}
        >
            <div
                style={{
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d',
                }}
                className="h-full"
            >
                {children}
            </div>

            {isHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `radial-gradient(
              600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%,
              rgba(99, 102, 241, 0.15),
              transparent 40%
            )`,
                    }}
                />
            )}
        </motion.div>
    )
}