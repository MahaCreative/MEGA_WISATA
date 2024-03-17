import NavLink from "@/Components/NavLink";
import Navbar from "@/Components/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import Kategori from "@/Pages/Kategori/Kategori";
import { Head, usePage } from "@inertiajs/react";
import { Email, LocationCity, LocationOn, Phone } from "@mui/icons-material";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Layout({ children, title, ...props }) {
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    const { profileWisata } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);
    return (
        <div className="w-full h-full bg-gradient-to-tl from-gray-500 via-gray-200 to-gray-300">
            <Head title={title} />
            <Toaster position="top-right" />
            <Navbar />
            {children}
            <div className="bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950 px-4 md:px-8 lg:px-16 py-3 ">
                <div className="grid grid-cols-2 md:grid-cols-3 items-start gap-4 my-4">
                    <div className="w-full col-span-3 md:col-span-2 lg:col-span-1 duration-300 transition-all ease-out">
                        <h3 className="font-semibold text-white text-xl my-3">
                            Contact Us
                        </h3>
                        <div>
                            <div className="flex gap-3 my-3 items-center">
                                <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                    <img
                                        src={"/storage/" + profileWisata.logo}
                                        alt=""
                                        className="w-[50px] h-[50px] object-cover object-top"
                                    />
                                </div>
                                <h1 className="text-white font-bold capitalize">
                                    {profileWisata.nama_wisata} Wisata Mangrove
                                </h1>
                            </div>
                            <div className="flex gap-3 items-center my-3">
                                <p className="text-white text-2xl">
                                    <LocationOn
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <p className="text-white line-clamp-2">
                                    {profileWisata.alamat}
                                </p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="text-white text-2xl">
                                    <Phone color="inherit" fontSize="inherit" />
                                </p>
                                <p className="text-white">
                                    {profileWisata.no_telp}
                                </p>
                            </div>
                            <div className="flex gap-3 items-center my-3">
                                <p className="text-white text-2xl">
                                    <Email color="inherit" fontSize="inherit" />
                                </p>
                                <p className="text-white">
                                    {profileWisata.email_wisata}
                                </p>
                            </div>
                            {auth.user && (
                                <SecondaryButton>
                                    Edit Profile Wisata
                                </SecondaryButton>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full col-span-3 md:col-span-1 duration-300 transition-all ease-out">
                        <Kategori />
                    </div>
                    <div className="flex flex-col gap-2 w-full col-span-3 md:col-span-3 lg:col-span-1 duration-300 transition-all ease-out">
                        <h3 className="font-semibold text-white text-xl my-3">
                            Menu Navigation
                        </h3>
                        <NavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            href={route("sarana")}
                            active={route().current("sarana")}
                        >
                            Sarana
                        </NavLink>
                        <NavLink
                            href={route("informasi")}
                            active={route().current("informasi")}
                        >
                            Informasi
                        </NavLink>
                        <NavLink
                            href={route("galery")}
                            active={route().current("galery")}
                        >
                            Galery
                        </NavLink>
                        <NavLink
                            href={route("ulasan")}
                            active={route().current("ulasan")}
                        >
                            Ulasan
                        </NavLink>
                    </div>
                </div>
                <div className="rounded-md overflow-hidden ">
                    <iframe
                        src={profileWisata.url_map}
                        width="100%"
                        height="450"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
