import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { Menu } from "@mui/icons-material";
import Dropdown from "./Dropdown";
import { Transition } from "@headlessui/react";

export default function Navbar(props) {
    const { profileWisata } = usePage().props;
    const { auth } = usePage().props;
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();
    const dropdownRef = useRef();
    const [openDrop, setOpenDrop] = useState(false);
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div className=" bg-slate-950/20 backdrop-blur-sm absolute w-full z-50">
            <div className="relative flex justify-between items-center">
                <div className="flex gap-3 items-center px-3 py-1 text-white">
                    <img
                        src={"/storage/" + profileWisata.logo}
                        alt=""
                        className="w-[25px]"
                    />
                    <p className="text-lg lg:text-xl capitalize text-white font-semibold ">
                        {profileWisata.nama_wisata + " Wisata Mangrove  Wai"}
                    </p>
                </div>
                <div className="gap-5 items-center px-4 hidden md:flex transition-all duration-300 py-3">
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
                    {auth.user && (
                        <div
                            onClick={() => setOpenDrop(!openDrop)}
                            className="relative text-white cursor-pointer hover:border-b-2 border-slate-800"
                        >
                            <div>{auth.user.name}</div>
                            <Transition
                                show={openDrop}
                                enterFrom="transform translate-y-1 opacity-0"
                                enterTo="transform translate-y-0 opacity-100"
                                leaveFrom="transform translate-y-0 opacity-100"
                                leaveTo="transform translate-y-1 opacity-0"
                            >
                                <div className="absolute top-10 right-0  z-[999] bg-white  text-slate-950 rounded-md">
                                    <Link
                                        className="inline-block w-full hover:bg-slate-900 py-1 px-3 hover:text-white"
                                        href={route("setting-profile")}
                                    >
                                        Setting Profile
                                    </Link>
                                    <Link
                                        className="inline-block w-full hover:bg-slate-900 py-1 px-3 hover:text-white"
                                        href={route("logout")}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </Transition>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setMenu(true)}
                    className="block md:hidden text-xl text-white px-4 py-2 hover:cursor-pointer"
                >
                    <Menu color="inherit" fontSize="inherit" />
                </div>
            </div>
            {/* mobile menu */}
            <div
                ref={menuRef}
                className={`${
                    menu
                        ? "max-h-10 md:max-h-0 overflow-y-visible md:overflow-y-hidden"
                        : " max-h-0 overflow-y-hidden"
                }  transition-all duration-300 ease-in-out  bg-slate-950/50 backdrop-blur-sm w-full h-10 flex items-center justify-center`}
            >
                <div className="flex gap-5">
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
                    {auth.user && (
                        <div
                            onClick={() => setOpenDrop(!openDrop)}
                            className="relative text-white cursor-pointer hover:border-b-2 border-slate-800"
                        >
                            <div>{auth.user.name}</div>
                            <Transition
                                show={openDrop}
                                enterFrom="transform translate-y-1 opacity-0"
                                enterTo="transform translate-y-0 opacity-100"
                                leaveFrom="transform translate-y-0 opacity-100"
                                leaveTo="transform translate-y-1 opacity-0"
                            >
                                <div className="absolute top-10 right-0  z-[999] bg-white  text-slate-950 rounded-md">
                                    <Link
                                        className="inline-block w-full hover:bg-slate-900 py-1 px-3 hover:text-white"
                                        href={route("setting-profile")}
                                    >
                                        Setting Profile
                                    </Link>
                                    <Link
                                        className="inline-block w-full hover:bg-slate-900 py-1 px-3 hover:text-white"
                                        href={route("logout")}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </Transition>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
