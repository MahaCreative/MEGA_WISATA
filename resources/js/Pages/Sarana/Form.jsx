import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { FileUpload } from "@mui/icons-material";
import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_sarana: "",
        foto_sarana: "",
        status_sewa: "",
        harga_sewa: "",
    });
    const [image, setImage] = useState(null);
    const inputHidden = useRef(null);
    const uploadImage = () => {
        inputHidden.current.click();
    };
    const changeImage = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setData("foto_sarana", selectedFile);
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("sarana-update"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
                reset();
            },
            preserveScroll: false,
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("sarana-create"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
                reset();
            },
            preserveScroll: false,
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_sarana: model ? model.nama_sarana : "",
            foto_sarana: model ? model.foto_sarana : "",
            status_sewa: model ? model.status_sewa : "",
            harga_sewa: model ? model.harga_sewa : "",
        });
    }, [model]);
    return (
        <form
            className="max-h-[90vh]"
            onSubmit={model ? updateHandler : submitHandler}
        >
            <div className="my-2 flex gap-3 flex-col px-4 py-2">
                <TextField
                    className="w-full rounded-md overflow-hidden bg-white"
                    id="filled-basic"
                    value={data.nama_sarana}
                    label="Nama Sarana"
                    variant="filled"
                    name="nama_sarana"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputError message={errors.nama_sarana} />
                <InputLabel>Status Sewa</InputLabel>
                <Select
                    value={data.status_sewa}
                    title="Status Sewa"
                    onChange={(e) =>
                        setData({ ...data, status_sewa: e.target.value })
                    }
                >
                    <MenuItem value="">Pilih Status Sewa</MenuItem>
                    <MenuItem value="sewa">Sewa</MenuItem>
                    <MenuItem value="gratis">Gratis</MenuItem>
                </Select>
                <InputError message={errors.status_sewa} />
                {data.status_sewa == "sewa" && (
                    <TextField
                        type="numeric"
                        className="w-full rounded-md overflow-hidden bg-white"
                        id="filled-basic"
                        value={data.harga_sewa}
                        label="Harga sewa"
                        variant="filled"
                        name="harga_sewa"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                )}
                <InputError message={errors.harga_sewa} />
                <div className="w-full">
                    <div className="rounded-md overflow-hidden">
                        <InputLabel>Foto Sarana</InputLabel>
                        <img
                            src={
                                image
                                    ? image
                                    : model
                                    ? "/storage/" + data.foto_sarana
                                    : "/storage/Image/slider_preview.jpg"
                            }
                            alt=""
                            className="h-[200px] w-full object-cover object-center"
                        />
                        <InputError message={errors.foto_sarana} />
                    </div>
                    <div
                        onClick={uploadImage}
                        className="bg-slate-700 hover:cursor-pointer text-white my-2 px-2 py-1 rounded-md flex items-center justify-center"
                    >
                        <input
                            type="file"
                            onChange={changeImage}
                            className="hidden"
                            ref={inputHidden}
                        />
                        <span className="text-3xl mx-3">
                            <FileUpload color="inherit" fontSize="inherit" />
                        </span>
                        <span className="text-sm py-1">Upload Image</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <PrimaryButton>{model ? "Update" : "Tambah"}</PrimaryButton>
                    <DangerButton
                        type="button"
                        onClick={() => {
                            setModel(null);
                            setOpen(false);
                        }}
                    >
                        Cancell
                    </DangerButton>
                </div>
            </div>
        </form>
    );
}
