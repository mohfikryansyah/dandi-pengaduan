import { NAV_ITEMS, NavLink } from '@/layouts/navbar/navbar';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        // <footer className="m-4 mt-16 rounded-2xl bg-neutral-800 text-white md:m-8 md:mt-32">
        //     <div className="container mx-auto flex flex-col gap-8 px-6 py-8 md:py-12">
        //         <div className="flex w-full flex-col gap-8 md:flex-row md:gap-20">
        //             <div className="flex w-full flex-col gap-2 md:w-1/3">
        //                 <img src="/assets/images/logouniv.png" alt="" className="w-28 h-auto" />
        //                 {/* <p className="mt-4 text-sm leading-relaxed lg:text-base">
        //                 Sirisa adalah platform informasi untuk membantu kamu memahami dan mengelola risiko sumber daya alam secara lebih baik.
        //                 </p> */}
        //                 <div className="mt-4 flex flex-col items-start gap-4 xl:flex-row">
        //                     <div className="flex items-center justify-center gap-1 text-sm text-neutral-300">
        //                         <svg
        //                             stroke="currentColor"
        //                             fill="currentColor"
        //                             strokeWidth={0}
        //                             viewBox="0 0 384 512"
        //                             className="text-2xl"
        //                             height="1em"
        //                             width="1em"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                         >
        //                             <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
        //                         </svg>
        //                         <p> Gorontalo, Indonesia</p>
        //                     </div>
        //                     <a
        //                         target="_blank"
        //                         className="flex items-center justify-center gap-1 text-sm text-neutral-300"
        //                         href="https://wa.me/6282290142486"
        //                     >
        //                         <svg
        //                             stroke="currentColor"
        //                             fill="currentColor"
        //                             strokeWidth={0}
        //                             viewBox="0 0 24 24"
        //                             className="text-2xl"
        //                             height="1em"
        //                             width="1em"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                         >
        //                             <path fill="none" d="M0 0h24v24H0z"></path>
        //                             <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
        //                         </svg>
        //                         <p>+62822900000</p>
        //                     </a>
        //                 </div>
        //             </div>
        //             {/* <div className="flex w-full flex-wrap gap-8 md:w-2/3 md:flex-nowrap">
        //                 <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
        //                     <h2 className="mb-2 font-bold">Program</h2>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/course"
        //                     >
        //                         Online Course
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/#"
        //                     >
        //                         Bootcamp
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/#"
        //                     >
        //                         Corporate Training
        //                     </a>
        //                 </div>
        //                 <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
        //                     <h2 className="mb-2 font-bold">Company</h2>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/about"
        //                     >
        //                         Tentang Kami
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="https://discord.gg/wpu"
        //                     >
        //                         Komunitas
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/#"
        //                     >
        //                         Karir
        //                     </a>
        //                 </div>
        //                 <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
        //                     <h2 className="mb-2 font-bold">Support</h2>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/contact"
        //                     >
        //                         Hubungi Kami
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/terms-condition"
        //                     >
        //                         Syarat dan Ketentuan
        //                     </a>
        //                     <a
        //                         className="w-fit text-neutral-400 hover:text-neutral-200"
        //                         href="/privacy-policy"
        //                     >
        //                         Kebijakan Privasi
        //                     </a>
        //                 </div>
        //             </div> */}
        //         </div>
        //         <div className="flex flex-col-reverse justify-between gap-4 border-t-2 border-neutral-700 pt-4 md:flex-row lg:items-center">
        //             <p className="text-sm text-neutral-400">
        //                 E-Lapor - Universitas Muhamadiyah Gorontalo
        //             </p>
        //             <div className="flex gap-4">
        //                 <a
        //                     className="text-3xl text-neutral-400 hover:text-neutral-200"
        //                     target="_blank"
        //                     href="https://instagram.com/bpkhtlxvgorontalo"
        //                 >
        //                     <svg
        //                         stroke="currentColor"
        //                         fill="currentColor"
        //                         strokeWidth={0}
        //                         viewBox="0 0 448 512"
        //                         height="1em"
        //                         width="1em"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                         <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        //                     </svg>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <footer className="flex w-full flex-col items-center justify-center rounded-tl-[10rem] bg-sky-900 py-20 px-4">
            <div className="mx-auto w-full max-w-5xl space-y-10">
                <div className="flex md:flex-row flex-col items-center justify-between">
                    <img src="/assets/images/logo-desa.png" className="size-22" alt="" />
                    <ul className="not-md:hidden mt-4 mr-5 flex flex-col rounded-lg bg-transparent p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.label} {...item} />
                        ))}
                    </ul>
                    <Link
                        href={route('register')}
                        className="not-md:hidden inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Register
                    </Link>
                </div>
                <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
                    <p className="text-gray-100">© Universitas Negeri Gorontalo</p>
                    <div className="flex items-center gap-4">
                        <Instagram className="text-white" />
                        <Facebook className="text-white" />
                        <Twitter className="text-white" />
                    </div>
                </div>
                <p className="text-gray-300">
                   Sistem Informasi Desa Pilohulata adalah sistem pelaporan digital yang dikembangkan oleh Universitas Negeri Gorontalo untuk memfasilitasi penyampaian
                    aspirasi, aduan, dan masukan dari masyaarakat secara cepat, transparan, dan terstruktur. Aplikasi ini hadir sebagai bentuk
                    komitmen Desa Pilohulata dalam meningkatkan tata kelola desa yang partisipatif dan responsif terhadap kebutuhan masyarakat.
                </p>
            </div>
        </footer>
    );
}
