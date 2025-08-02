import { router } from '@inertiajs/react';
import { motion } from 'motion/react';

export default function HeroSection() {
    return (
        <div className="flex w-full items-center justify-center bg-sky-800 h-[60dvh] px-4">
            <div className="w-full max-w-3xl">
                <h1 className="relative z-10 mx-auto max-w-xl text-center text-2xl font-bold text-gray-50 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {'Website Resmi Desa Pilohulata'.split(' ').map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: 'easeInOut',
                            }}
                            className="mr-2 inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-gray-300 dark:text-neutral-400"
                >
                    Website ini dapat dijadikan tempat penyampaian keluhan, masukan, atau saran dengan mudah. Anda juga dapat membuat permohonan surat secara online.
                </motion.p>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                    <button
                        onClick={() => router.get(route('pengaduan.create'))}
                        className="w-60 transform rounded-lg bg-yellow-400 px-6 py-2 font-medium text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Sampaikan Keluhan
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
