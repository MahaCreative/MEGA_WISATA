import DangerButton from "@/Components/DangerButton";
import Jumbotron from "@/Components/Jumbotron";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SideMenu from "@/Components/SideMenu";
import Layout from "@/Layouts/LayoutPage";
import { Link, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Form from "./Form";
import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Transition } from "@headlessui/react";

export default function Index(props) {
    const sarana = props.sarana;
    const { profileWisata } = usePage().props;
    const { auth } = usePage().props;
    const [model, setModel] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalTable, setModalTable] = useState(false);
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
    const [openLihat, setOpenLihat] = useState(false);

    const lihatImage = (e) => {
        setModel(e);
        setOpenLihat(true);
    };
    return (
        <div>
            {/* Modal */}
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
            <div>
                <Modal maxWidth="3xl" show={modalTable} onClose={setModalTable}>
                    <div className="py-2 px-3 w-full max-h-[90vh] overflow-scroll">
                        <h3 className="font-bold text-sm tracking-tight border-slate-950  border-b inline-block">
                            Informasi Dalam Bentuk Table
                        </h3>
                        <TableContainer
                            sx={{ minWidth: 800 }}
                            component={Paper}
                            className="w-full bg-red-500 my-3 shadow-sm shadow-gray-500"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell align="center">
                                        Nama Sarana
                                    </TableCell>
                                    <TableCell align="center">
                                        Status Sewa
                                    </TableCell>
                                    <TableCell align="center">
                                        Harga Sewa
                                    </TableCell>
                                    <TableCell align="center">
                                        Tanggal Dibuat
                                    </TableCell>
                                    <TableCell align="center">Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sarana.map((item, key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <img
                                                src={
                                                    "/storage/" +
                                                    item.foto_sarana
                                                }
                                                alt=""
                                                className="w-[50px] h-[50px] object-cover object-center"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.nama_sarana}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: 450 }}>
                                            {item.harga_sewa
                                                ? item.harga_sewa
                                                : "Rp. 0"}
                                        </TableCell>
                                        <TableCell>{item.dilihat}</TableCell>
                                        <TableCell>
                                            {moment(item.created_at).format(
                                                "ll"
                                            )}
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
                    maxWidth="3xl"
                    show={modal}
                    setModal={setModal}
                    title={model ? "Update Sarana" : "Tambah Sarana"}
                >
                    <Form
                        model={model}
                        setModel={setModel}
                        setOpen={setModal}
                    />
                </Modal>
                <Modal
                    maxWidth="xl"
                    show={modalDelete}
                    onClose={() => setModalDelete(false)}
                >
                    <div className="py-3 px-4 font-bold">
                        Apakah anda yakin ingin menghapus galery dengan judul{" "}
                        {model?.judul} Data yang terhapus tidak akan
                        dikembalikan lagi.
                    </div>
                    <div className="flex items-center gap-4 py-2 px-4">
                        <Link
                            onSuccess={() => {
                                setModel(null);
                                setModalDelete(false);
                            }}
                            as="button"
                            method="delete"
                            href={route("sarana-delete", { id: model?.id })}
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
            </div>
            <Jumbotron
                image={"/storage/Image/mangrove.jpg"}
                title={`Fasilitas ${profileWisata.nama_wisata} yang disediakan untuk anda`}
                tagline={
                    "Nikmati fasilitas layanan yang kami sediakan dan ciptakan liburan yang berkesan bagi keluarga anda"
                }
            />
            <div className="flex flex-col md:flex-row justify-between py-6  md:px-2 lg:px-8 w-full gap-5">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full ">
                        <h1 className="text-slate-950 font-extrabold tracking-tighter text-xl capitalize border-b-2 border-slate-600 ">
                            sarana
                        </h1>
                        {auth.user && (
                            <div className="flex md:flex-row gap-x-4 gap-1 flex-col">
                                <div className="flex gap-4 items-center md:py-0 py-2">
                                    <PrimaryButton
                                        onClick={() => setModal(true)}
                                    >
                                        Tambah sarana
                                    </PrimaryButton>
                                    <PrimaryButton onClick={showTable}>
                                        Table sarana
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {sarana.map((item, key) => (
                            <div
                                onClick={() => lihatImage(item)}
                                key={key}
                                // href={route("show.sarana", item.slug)}
                                className="flex hover:cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all"
                            >
                                <div className="py-3  px-3 my-3 rounded-md mx-3">
                                    <LazyLoadImage
                                        src={"/storage/" + item.foto_sarana}
                                        className="w-full rounded-md object-cover object-center h-[150px]"
                                    />
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-bold text-slate-800 text-md line-clamp-1">
                                            {item.nama_sarana}
                                        </h2>
                                    </div>
                                    <div className="text-sm capitalize font-light text-slate-700 tracking-tight leading-tight line-clamp-2">
                                        {item.status_sewa}
                                    </div>
                                    <div className=" text-green-500 capitalize tracking-tight leading-tight line-clamp-2 text-lg font-semibold">
                                        Harga Sewa :{" "}
                                        {item.harga_sewa
                                            ? item.harga_sewa
                                            : "Rp.-"}
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
Index.layout = (page) => <Layout children={page} title={"Sarana"} />;
