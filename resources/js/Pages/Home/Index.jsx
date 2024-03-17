import "react-slideshow-image/dist/styles.css";
import React, {
    Fragment,
    Suspense,
    lazy,
    useCallback,
    useEffect,
    useState,
} from "react";
import LayoutPage from "@/Layouts/LayoutPage";
import PrimaryButton from "@/Components/PrimaryButton";
import { TextField, debounce } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";
import SideMenu from "@/Components/SideMenu";
import { Link, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Slide } from "react-slideshow-image";
const Slider = React.lazy(() => import("@/Pages/Slider/Slider"));
export default function Index({ galery, informasi, slider, sarana, ...props }) {
    let position = "";
    const [model, setModel] = useState(null);
    const [openLihat, setOpenLihat] = useState(false);

    const lihatImage = (e) => {
        setModel(e);
        setOpenLihat(true);
    };
    const [params, setParams] = useState({ i: "", g: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("home"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="h-full w-full">
            <Transition
                show={openLihat}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    onClick={() => {
                        setModel(null);
                        setOpenLihat(false);
                    }}
                    className={`w-full h-full fixed z-[99] top-0 left-0 bg-slate-900/40 backdrop-blur-sm `}
                >
                    <div className="relative left-0 top-0 h-full w-full">
                        <div className="flex items-center justify-center h-full">
                            <div>
                                <img
                                    src={"/storage/" + model?.foto_sarana}
                                    alt=""
                                />
                                <p className="text-white font-semibold capitalize bg-slate-950  px-3 inline-block my-3 py-2 rounded-md">
                                    {model?.nama_sarana}
                                </p>
                                <p className="text-white font-semibold capitalize bg-slate-950  px-3 inline-block my-3 py-2 rounded-md mx-3">
                                    Status Sewa : {model?.status_sewa}
                                </p>
                                <p className="text-white font-semibold capitalize bg-slate-950  px-3 inline-block my-3 py-2 rounded-md mx-3">
                                    Harga Sewa :{" "}
                                    {model?.harga_sewa
                                        ? model?.harga_sewa
                                        : "Rp.-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            <Slider slider={slider} />
            <div className="flex">
                <div className="flex flex-col md:flex-row justify-between w-full gap-2">
                    <div className="flex flex-col justify-between  px-2 md:px-4 lg:px-8 w-full gap-3">
                        <div className="w-full px-4 md:px-8 lg:px-8 transition-all duration-300 ease-out">
                            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                                <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                                    Informasi
                                </h1>
                                <div className="flex  justify-end items-end gap-x-4 gap-1 flex-col w-[100%] md:w-[50%] my-2">
                                    <TextField
                                        onChange={(e) =>
                                            setParams({
                                                ...params,
                                                i: e.target.value,
                                            })
                                        }
                                        className="md:w-[50%] w-full rounded-md overflow-hidden"
                                        id="filled-basic"
                                        label="Cari"
                                        variant="filled"
                                        name="cari"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                {informasi.map((item, key) => (
                                    <Link
                                        key={key}
                                        href={route(
                                            "show.informasi",
                                            item.slug
                                        )}
                                        className="flex hover:cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all"
                                    >
                                        <div className="py-3  px-3 my-3 rounded-md mx-3">
                                            <LazyLoadImage
                                                src={
                                                    "/storage/" + item.thumbnail
                                                }
                                                className="w-full rounded-md object-cover object-center h-[150px]"
                                            />
                                            <div className="flex justify-between items-center">
                                                <h2 className="font-bold text-slate-800 text-md line-clamp-1">
                                                    {item.judul}
                                                </h2>
                                                <p className="text-xs text-slate-600">
                                                    {moment(
                                                        item.created_at
                                                    ).format("ll")}
                                                </p>
                                            </div>
                                            <div className="text-sm font-light text-slate-700 tracking-tight leading-tight line-clamp-2">
                                                {item.text}
                                                <span className="text-slate-900">
                                                    Baca Selengkapnya
                                                </span>
                                            </div>
                                            <div className="flex gap-3 my-2">
                                                <div className="flex gap-3 my-2 text-sm font-semibold">
                                                    Total Views : {item.dilihat}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* <Pagination {...meta} {...links} /> */}
                        </div>
                        <div className="w-full  rounded-md px-4 md:px-8 lg:px-8 transition-all duration-300 ease-out">
                            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                                <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                                    Galery
                                </h1>
                                <div className="flex  justify-end items-end gap-x-4 gap-1 flex-col w-[100%] md:w-[50%] my-2">
                                    <TextField
                                        onChange={(e) =>
                                            setParams({
                                                ...params,
                                                g: e.target.value,
                                            })
                                        }
                                        className="md:w-[50%] w-full rounded-md overflow-hidden"
                                        id="filled-basic"
                                        label="Cari"
                                        variant="filled"
                                        name="cari"
                                    />
                                </div>
                            </div>
                            <div
                                className={`columns-1  sm:columns-2  md:columns-3 lg:columns-4`}
                            >
                                {galery.map((item, key) => (
                                    <Link
                                        key={key}
                                        href={route("show.galery", item.slug)}
                                        className="flex hover:cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all "
                                    >
                                        <div className=" rounded-md relative my-2">
                                            <LazyLoadImage
                                                src={
                                                    "/storage/" + item.thumbnail
                                                }
                                                className="rounded-md object-cover object-center h-auto w-auto"
                                            />
                                            <div className="absolute z-[2] bottom-0 left-0 w-full text-white bg-slate-950 px-3">
                                                <div className="relative">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="font-bold text-white text-md line-clamp-1">
                                                            {item.judul}
                                                        </h2>

                                                        <p className="text-xs text-slate-600">
                                                            {moment(
                                                                item.created_at
                                                            ).format("ll")}
                                                        </p>
                                                    </div>
                                                    <p
                                                        className="line-clamp-2 text-xs"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.text,
                                                        }}
                                                    />
                                                    <div className="flex gap-3 my-2">
                                                        <div className="flex gap-3 my-2 text-sm font-semibold">
                                                            Total Views :{" "}
                                                            {item.dilihat}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* <Pagination {...meta} {...links} /> */}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between   w-full gap-5">
                            <div className="w-full">
                                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                                    <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                                        sarana
                                    </h1>
                                </div>
                                <Slide
                                    canSwipe={true}
                                    slidesToShow={3}
                                    slidesToScroll={2}
                                >
                                    {sarana.map((item, key) => (
                                        <div
                                            className="flex gap-3 hover:scale-105 hover:cursor-pointer mx-3"
                                            onClick={() => lihatImage(item)}
                                            key={key}
                                        >
                                            <div className="py-3 w-full  my-3 rounded-md flex flex-col">
                                                <LazyLoadImage
                                                    src={
                                                        "/storage/" +
                                                        item.foto_sarana
                                                    }
                                                    className="w-full rounded-md object-cover object-center h-[150px]"
                                                />
                                                <div className="flex justify-between items-center px-4">
                                                    <h2 className="font-bold text-slate-800 text-md line-clamp-1">
                                                        {item.nama_sarana}
                                                    </h2>
                                                </div>
                                                <div className="text-sm capitalize font-light px-4 text-slate-700 tracking-tight leading-tight line-clamp-2">
                                                    {item.status_sewa}
                                                </div>
                                                <div className=" text-green-500 capitalize px-4 tracking-tight leading-tight line-clamp-2 text-lg font-semibold">
                                                    Harga Sewa :{" "}
                                                    {item.harga_sewa
                                                        ? item.harga_sewa
                                                        : "Rp.-"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slide>
                                {/* <Pagination {...meta} {...links} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => <LayoutPage children={page} title={"Home"} />;
