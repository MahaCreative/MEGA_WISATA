import DangerButton from "@/Components/DangerButton";
import Jumbotron from "@/Components/Jumbotron";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SideMenu from "@/Components/SideMenu";
import Layout from "@/Layouts/LayoutPage";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    debounce,
} from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Form from "./Form";

export default function Index(props) {
    const { profileWisata } = usePage().props;
    const { auth } = usePage().props;
    const { data: galery, meta, links } = props.galery;
    const [model, setModel] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalTable, setModalTable] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const showTable = () => {
        setModalTable(true);
    };
    const editHandler = (value) => {
        setModel(value);
        setModal(true);
        setModalTable(false);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
        setModalTable(false);
    };
    const [params, setParams] = useState({ cari: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("galery"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <Modal maxWidth="3xl" show={modalTable} onClose={setModalTable}>
                <div className="py-2 px-3 w-full max-h-[90vh] overflow-scroll">
                    <h3 className="font-bold text-sm tracking-tight border-slate-950  border-b inline-block">
                        Galery Dalam Bentuk Table
                    </h3>
                    <TableContainer
                        sx={{ minWidth: 800 }}
                        component={Paper}
                        className="w-full bg-red-500 my-3 shadow-sm shadow-gray-500"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Judul</TableCell>
                                <TableCell align="center">Text</TableCell>
                                <TableCell align="center">Dilihat</TableCell>
                                <TableCell align="center">
                                    Tanggal Dibuat
                                </TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {galery.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell>
                                        <img
                                            src={"/storage/" + item.thumbnail}
                                            alt=""
                                            className="w-[50px] h-[50px] object-cover object-center"
                                        />
                                    </TableCell>
                                    <TableCell>{item.judul}</TableCell>
                                    <TableCell sx={{ maxWidth: 450 }}>
                                        <p
                                            className="text-xs line-clamp-2"
                                            dangerouslySetInnerHTML={{
                                                __html: item.text,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{item.dilihat}</TableCell>
                                    <TableCell>
                                        {moment(item.created_at).format("ll")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-3">
                                            <PrimaryButton
                                                onClick={() =>
                                                    editHandler(item)
                                                }
                                            >
                                                Edit
                                            </PrimaryButton>
                                            <DangerButton
                                                onClick={() =>
                                                    deleteHandler(item)
                                                }
                                            >
                                                Delete
                                            </DangerButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContainer>
                </div>
            </Modal>
            <Modal
                maxWidth="xl"
                show={modalDelete}
                onClose={() => setModalDelete(false)}
            >
                <div className="py-3 px-4 font-bold">
                    Apakah anda yakin ingin menghapus galery dengan judul{" "}
                    {model?.judul} Data yang terhapus tidak akan dikembalikan
                    lagi.
                </div>
                <div className="flex items-center gap-4 py-2 px-4">
                    <Link
                        onSuccess={() => {
                            setModel(null);
                            setModalDelete(false);
                        }}
                        as="button"
                        method="delete"
                        href={route("galery-delete", { id: model?.id })}
                        preserveScroll={true}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
                    >
                        Yakin
                    </Link>
                    <DangerButton
                        onClick={() => {
                            setModalDelete(false);
                            setModel(null);
                        }}
                    >
                        Cancell
                    </DangerButton>
                </div>
            </Modal>
            <Modal maxWidth="3xl" show={modal} onClose={setModal}>
                <div className="py-2 px-3 max-h-[90vh]">
                    <h3 className="font-bold text-sm tracking-tight border-slate-950  border-b inline-block">
                        Form {model ? "Update" : "Tambah"} Galery
                    </h3>
                    <Form
                        setOpen={setModal}
                        model={model}
                        setModel={setModel}
                    />
                </div>
            </Modal>
            <Jumbotron
                image={"/storage/Image/mangrove.jpg"}
                title={`Galery ${profileWisata.nama_wisata}`}
                tagline={`Kenangan yang terdapat di ${profileWisata.nama_wisata} akan selalu tersimpan pada sistem Galery ini`}
            />
            <div className="flex flex-col md:flex-row justify-between py-6  md:px-2 lg:px-8 w-full gap-5">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                        <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                            Galery
                        </h1>
                        <div className="flex md:flex-row gap-x-4 gap-1 flex-col">
                            {auth.user && (
                                <div className="flex gap-4 items-center md:py-0 py-2">
                                    <PrimaryButton
                                        onClick={() => setModal(true)}
                                    >
                                        Tambah Galery
                                    </PrimaryButton>
                                    <PrimaryButton onClick={showTable}>
                                        Table Galery
                                    </PrimaryButton>
                                </div>
                            )}
                            <TextField
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                                className="w-full rounded-md overflow-hidden"
                                id="filled-basic"
                                label="Cari"
                                variant="filled"
                                name="cari"
                            />
                        </div>
                    </div>
                    <div className="columns-1  sm:columns-2  md:columns-3 lg:columns-5 py-3">
                        {galery.map((item, key) => (
                            <div
                                key={key}
                                // href={route("show.Galery", item.slug)}
                                className="flex hover:cursor-pointer my-3 hover:scale-105 duration-300 ease-in-out transition-all group overflow-hidden text-white"
                            >
                                <div className="rounded-md relative">
                                    <LazyLoadImage
                                        src={item.thumbnail}
                                        className="w-auto rounded-md object-cover object-center h-auto"
                                    />
                                    <div className="absolute left-0 bottom-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 group-hover:w-full group-hover:translate-x-0 -translate-x-full overflow-hidden w-0 transition-all duration-300 p-2 overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <h2 className="font-bold textwbg-white text-sm line-clamp-1">
                                                {item.judul}
                                            </h2>
                                            <p className="text-xs text-white">
                                                {moment(item.created_at).format(
                                                    "ll"
                                                )}
                                            </p>
                                        </div>
                                        <div className="text-xs font-light text-white tracking-tight leading-tight line-clamp-2">
                                            {item.text}
                                            <span className="text-slate-900">
                                                Baca Selengkapnya
                                            </span>
                                        </div>
                                        {auth.user && (
                                            <div className="flex gap-3 my-2">
                                                <SecondaryButton
                                                    onClick={() =>
                                                        editHandler(item)
                                                    }
                                                >
                                                    Edit
                                                </SecondaryButton>
                                                <DangerButton
                                                    onClick={() =>
                                                        deleteHandler(item)
                                                    }
                                                >
                                                    Delete
                                                </DangerButton>
                                            </div>
                                        )}
                                        <div className="flex gap-3 my-2 text-sm font-semibold">
                                            Total Views : {item.dilihat}
                                        </div>
                                        <Link
                                            className="text-blue-500 text-xs"
                                            href={route(
                                                "show.galery",
                                                item.slug
                                            )}
                                        >
                                            Lihat Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <Pagination {...meta} {...links} /> */}
                </div>
                <SideMenu />
            </div>
        </div>
    );
}
Index.layout = (page) => <Layout children={page} title={"Galery"} />;
