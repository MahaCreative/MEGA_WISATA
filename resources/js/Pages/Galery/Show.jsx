import Jumbotron from "@/Components/Jumbotron";
import SideMenu from "@/Components/SideMenu";
import Layout from "@/Layouts/LayoutPage";
import { Head, usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function Show({ galery }) {
    const { profileWisata } = usePage().props;
    return (
        <div>
            <Head title={galery.judul} />
            <Jumbotron
                image={"/storage/Image/mangrove.jpg"}
                title={`galery Wisata ${profileWisata.nama_wisata}`}
                tagline={`galery seputar kegiatan atau event yang
                            diselenggarakan di ${profileWisata.nama_wisata} bisa
                            anda baca disini. Harapan kami adalah anda datang
                            sebagai tamu pulang sebagai keluarga`}
            />

            <div className="flex flex-col md:flex-row justify-between py-6 px-16 w-full gap-5">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                        <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                            {galery.judul}
                        </h1>
                        <p className="text-xs font-light">
                            {moment(galery.created_at).format("llll")}
                        </p>
                    </div>
                    <div className="my-9 px-3 rounded-md shadow-md shadow-gray-500/50 py-3">
                        <img
                            src={"/storage/" + galery.thumbnail}
                            alt=""
                            className="w-full h-[300px] object-cover object-center"
                        />
                        <div
                            className="my-3"
                            dangerouslySetInnerHTML={{ __html: galery.text }}
                        />
                    </div>
                </div>
                <SideMenu />
            </div>
        </div>
    );
}
Show.layout = (page) => <Layout children={page} />;
