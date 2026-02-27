import { motion } from "framer-motion";

/* ============================
   Animated Word Reveal
============================ */

export function AnimatedText({ text, className = "", delay = 0 }) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: delay,
            },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap justify-center ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

/* ============================
   Glitch Text Effect
============================ */

export function GlitchText({ text, className = "" }) {
    return (
        <div className={`relative ${className}`}>
      <span className="relative inline-block">
        {text}

          <span
              className="absolute top-0 left-0 w-full h-full text-cyan-400 animate-pulse"
              style={{
                  clipPath: "inset(0 0 50% 0)",
                  transform: "translateX(-2px)",
                  opacity: 0.8,
              }}
          >
          {text}
        </span>

        <span
            className="absolute top-0 left-0 w-full h-full text-indigo-400 animate-pulse"
            style={{
                clipPath: "inset(50% 0 0 0)",
                transform: "translateX(2px)",
                opacity: 0.8,
                animationDelay: "0.1s",
            }}
        >
          {text}
        </span>
      </span>
        </div>
    );
}

/* ============================
   Typewriter Effect
============================ */

export function TypewriterText({ text, className = "", speed = 50 }) {
    return (
        <motion.span className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * (speed / 1000) }}
                >
                    {char}
                </motion.span>
            ))}

            <motion.span
                className="inline-block w-0.5 h-5 bg-indigo-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
            />
        </motion.span>
    );
}