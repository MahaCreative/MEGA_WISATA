import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

import { useForm, usePage } from "@inertiajs/react";
import { FileUpload } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { CKEditor } from "ckeditor4-react";

import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
export default function Form({ model, setModel, setOpen }) {
    const { kategori } = usePage().props;
    const [values, setValue] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        kategori_id: { value: "" },
        judul: "",
        text: "",
        thumbnail: "",
        id: "",
    });
    const [text, setText] = useState("");

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
        setData("thumbnail", selectedFile);
    };
    const ckeditorChange = (event, editor) => {
        setText(event.editor.getData());
    };
    useEffect(() => {
        setData({ ...data, text: text });
    }, [text]);
    useEffect(() => {
        let arr = [];
        kategori.map((item, key) => {
            arr.push({ value: item.id, label: item.kategori });
        });
        setValue(arr);
    }, []);
    useEffect(() => {
        setData({
            ...data,
            kategori_id: model ? model.kategori_id : "",
            judul: model ? model.judul : "",
            thumbnail: model ? model.thumbnail : "",
            id: model ? model.id : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("informasi-create"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
            },
            preserveScroll: true,
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("informasi-update"), {
            onSuccess: () => {
                setModel(null);
                setOpen(false);
            },
            preserveScroll: true,
        });
    };
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="my-3 flex flex-col gap-3"
        >
            <TextField
                className="w-full rounded-md overflow-hidden bg-white"
                id="filled-basic"
                value={data.judul}
                label="Judul Informasi"
                variant="filled"
                name="judul"
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputError message={errors.judul} />
            <InputLabel>
                {model
                    ? "Kategori Saat ini" + model?.kategori.kategori
                    : "Pilih Kategori"}
            </InputLabel>
            {model !== null ? (
                <InputLabel className="">
                    <span className="font-bold text-red-500">*</span> Kosong kan
                    jika tidak ingin mengganti kategori
                </InputLabel>
            ) : (
                ""
            )}
            <Select
                options={values}
                name="kategori_id"
                value={data.kategori_id}
                onChange={(e) => setData("kategori_id", e["value"])}
            />
            <InputError message={errors.kategori_id} />

            <div className="w-full">
                <div className="rounded-md overflow-hidden">
                    <InputLabel>Image Slider</InputLabel>
                    <img
                        src={
                            image
                                ? image
                                : model
                                ? "/storage/" + data.thumbnail
                                : "/storage/Image/slider_preview.jpg"
                        }
                        alt=""
                        className="h-[200px] w-full object-cover object-center"
                    />
                    <InputError message={errors.thumbnail} />
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
            <CKEditor
                onChange={ckeditorChange}
                editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js"
                initData={data.text}
                onInstanceReady={({ editor }) => {
                    // Handles native `instanceReady` event.

                    editor.setData(model ? model.text : "");
                }}
                type="classic"
            />
            <InputError message={errors.text} />
            <div className="my-2 flex gap-3">
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
        </form>
    );
}
