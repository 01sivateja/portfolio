import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className = '', ...props }) {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouseMove = (e) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        x.set(distanceX * 0.3)
        y.set(distanceY * 0.3)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            {...props}
        >
            {children}
        </motion.button>
    )
}