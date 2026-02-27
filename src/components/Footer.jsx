import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 px-4 border-t border-slate-800">
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <motion.a
                        href="#home"
                        className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        Portfolio
                    </motion.a>

                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <span>Built with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>using React & D3.js</span>
                    </div>

                    <p className="text-slate-500 text-sm">(c) {currentYear} Sivateja Pinninti. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
