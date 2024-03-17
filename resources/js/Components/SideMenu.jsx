import Kategori from "@/Pages/Kategori/Kategori";
import React from "react";
import NewPost from "./NewPost";

export default function SideMenu() {
    return (
        <div className="w-full md:w-[40%] lg:w-[30%] bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950 rounded-md px-3 py-3 inline h-full">
            <Kategori />
            <NewPost />
        </div>
    );
}
