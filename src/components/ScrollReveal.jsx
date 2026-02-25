import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, className = "", delay = 0, noY = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: noY ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
