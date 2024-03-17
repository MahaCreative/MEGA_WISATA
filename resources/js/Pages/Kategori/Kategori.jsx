import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, usePage } from "@inertiajs/react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Kategori() {
    const { kategori } = usePage().props;

    const [model, setModel] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const { auth } = usePage().props;
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const editHandler = (value) => {
        setModel(value);
        setOpen(true);
    };
    return (
        <div className="">
            <Modal show={modalDelete} onClose={() => setModalDelete(false)}>
                <div className="py-3 px-4 font-bold">
                    Apakah anda yakin ingin menghapus slider dengan judul{" "}
                    {model?.title} ? data yang terhapus tidak akan dikembalikan
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
                        href={route("kategori-delete", { id: model?.id })}
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
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-xl my-3">
                    Kategori
                </h3>
                {auth.user && (
                    <SecondaryButton className="" onClick={() => setOpen(true)}>
                        Tambah
                    </SecondaryButton>
                )}
            </div>

            {auth.user && (
                <Transition
                    show={open}
                    enter="ease-out duration-300"
                    enterFrom="-translate-x-full opacity-0"
                    enterTo="-translate-x-0 opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="translate-x-0 opacity-100"
                    leaveTo="-translate-x-full opacity-95"
                >
                    <Form model={model} setModel={setModel} setOpen={setOpen} />
                </Transition>
            )}

            {kategori.map((item, key) => (
                <div
                    preserveScroll={true}
                    key={key}
                    className="flex hover:bg-slate-800 duration-300 ease-in-out transition-all justify-between items-center text-white py-1 bg-slate-950 my-2 px-3 rounded-md"
                >
                    {auth.user == null ? (
                        <Link
                            href={route("show.kategori", item.slug)}
                            className="text-blue-400 hover:cursor-pointer"
                        >
                            {item.kategori}
                        </Link>
                    ) : (
                        <h3>{item.kategori}</h3>
                    )}
                    {auth.user && (
                        <div className="flex gap-2 items-center">
                            <Tooltip placement="top-start" title="Show">
                                <Link
                                    href={route("show.kategori", item.slug)}
                                    className="w-5 h-5 flex flex-row items-center justify-center rounded-md bg-green-500 hover:bg-green-700 active:bg-green-700 hover:cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <RemoveRedEye
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </Link>
                            </Tooltip>
                            <Tooltip placement="top-start" title="edit">
                                <div
                                    onClick={() => editHandler(item)}
                                    className="w-5 h-5 flex flex-row items-center justify-center rounded-md bg-orange-500 hover:bg-orange-700 active:bg-orange-700 hover:cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <Edit color="inherit" fontSize="inherit" />
                                </div>
                            </Tooltip>
                            <Tooltip placement="top-start" title="Delete">
                                <div
                                    onClick={() => deleteHandler(item)}
                                    className="w-5 h-5 flex flex-row items-center justify-center rounded-md bg-red-500 hover:bg-red-700 active:bg-red-700 hover:cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <Delete
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
