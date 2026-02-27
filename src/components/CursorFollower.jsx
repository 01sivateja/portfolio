import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorFollower() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const springConfig = { damping: 25, stiffness: 700 }

    const cursorX = useSpring(mousePosition.x, springConfig)
    const cursorY = useSpring(mousePosition.y, springConfig)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [data-cursor-hover]')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-indigo-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />

            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-indigo-400/50 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.5 : 0.3,
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            />
        </>
    )
}