import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { FormControl } from "@mui/base";
import { FileUpload } from "@mui/icons-material";
import {
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ setOpen, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        image: "",
        imageBackground: "",
        title: "",
        tagline: "",
        position: "",
        direction_text: "",
    });
    const inputHidden = useRef(null);
    const inputBackground = useRef(null);
    const [image, setImage] = useState(null);
    const [imageBackground, setImageBackground] = useState(null);
    const uploadBackground = (e) => {
        inputBackground.current.click();
    };
    const uploadImage = (e) => {
        inputHidden.current.click();
    };
    const changeBackground = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageBackground(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setData("imageBackground", selectedFile);
    };
    const changeImage = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setData("image", selectedFile);
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            image: model ? model.image : "",
            imageBackground: model ? model.imageBackground : "",
            title: model ? model.title : "",
            tagline: model ? model.tagline : "",
            position: model ? model.position : "",
            direction_text: model ? model.direction_text : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("slider-create"), {
            onSuccess: () => {
                setOpen(false);
                setModel(null);
                reset(
                    "direction_text",
                    "image",
                    "position",
                    "title",
                    "direction_text"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("slider-update"), {
            onSuccess: () => {
                setOpen(false);
                setModel(null);
                reset(
                    "direction_text",
                    "image",
                    "position",
                    "title",
                    "direction_text"
                );
            },
        });
    };

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full py-2 px-4 max-h-[80vh] overflow-y-auto"
        >
            <div className="my-3">
                <TextField
                    className="w-full rounded-md overflow-hidden"
                    id="filled-basic"
                    value={data.title}
                    label="Judul Slider"
                    variant="filled"
                    name="title"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputError message={errors.title} />
            </div>
            <div className="my-3">
                <TextField
                    maxRows={4}
                    className="w-full border-none"
                    id="outlined-multiline-flexible "
                    multiline
                    value={data.tagline}
                    label="Tagline"
                    name="tagline"
                    onChange={(e) => setData("tagline", e.target.value)}
                />
                <InputError message={errors.tagline} />
            </div>
            <div className="my-2">
                <div className="flex gap-3 items-center">
                    <FormControl
                        variant="filled"
                        className="w-full rounded-md overflow-hidden"
                    >
                        <InputLabel id="demo-simple-select-filled-label">
                            Posisi
                        </InputLabel>
                        <Select
                            defaultValue={data.position}
                            value={data.position}
                            className="w-full"
                            name="position"
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem
                                value={data.position}
                                disabled={model ? true : false}
                            >
                                <em>
                                    {model ? data.position : "Pilih Posisi"}
                                </em>
                            </MenuItem>
                            <MenuItem value={"left"}>Left</MenuItem>
                            <MenuItem value={"Center"}>Center</MenuItem>
                            <MenuItem value={"Right"}>Right</MenuItem>
                        </Select>
                    </FormControl>
                    <Tooltip
                        disableFocusListener
                        title="isian ini akan mengatur tata letak dari posisi gambar dan tagline "
                    >
                        <span className="p-1 w-7 h-7 flex flex-col items-center justify-center text-center bg-slate-700 rounded-full text-white hover:cursor-pointer">
                            ?
                        </span>
                    </Tooltip>
                </div>
                <InputError message={errors.position} />
            </div>
            <div className="my-2">
                <div className="flex gap-3 items-center">
                    <FormControl
                        variant="filled"
                        className="w-full rounded-md overflow-hidden"
                    >
                        <InputLabel id="demo-simple-select-filled-label">
                            Text Direction
                        </InputLabel>
                        <Select
                            className="w-full"
                            name="direction_text"
                            value={data.direction_text}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem
                                value={data.direction_text}
                                disabled={model ? true : false}
                            >
                                <em>
                                    {model
                                        ? data.direction_text
                                        : "Pilih Direksi Teks"}
                                </em>
                            </MenuItem>

                            <MenuItem value={"left"}>Left</MenuItem>
                            <MenuItem value={"Right"}>Right</MenuItem>
                        </Select>
                    </FormControl>
                    <Tooltip
                        disableFocusListener
                        title="direction text akan mengatur posisi Title dan Tagline berada pada kiri atau kanan dari image"
                    >
                        <span className="p-1 w-7 h-7 flex flex-col items-center justify-center text-center bg-slate-700 rounded-full text-white hover:cursor-pointer">
                            ?
                        </span>
                    </Tooltip>
                </div>
                <InputError message={errors.direction_text} />
            </div>
            <div className="my-2  flex gap-3 items-start w-full">
                <div className="w-full">
                    <div className="rounded-md overflow-hidden">
                        <InputLabel>Image Slider</InputLabel>
                        <img
                            src={
                                image
                                    ? image
                                    : model
                                    ? "/storage/" + data.image
                                    : "/storage/Image/slider_preview.jpg"
                            }
                            alt=""
                            className="h-[200px] w-full object-cover object-center"
                        />
                        <InputError message={errors.image} />
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
                <div className="w-full">
                    <div className="rounded-md overflow-hidden">
                        <InputLabel>Background Slider</InputLabel>
                        <img
                            src={
                                imageBackground
                                    ? imageBackground
                                    : model
                                    ? "/storage/" + data.imageBackground
                                    : "/storage/Image/slider_preview.jpg"
                            }
                            alt=""
                            className="h-[200px] w-full object-cover object-center"
                        />
                        <InputError message={errors.imageBackground} />
                    </div>
                    <div
                        onClick={uploadBackground}
                        className="bg-slate-700 hover:cursor-pointer text-white my-2 px-2 py-1 rounded-md flex items-center justify-center"
                    >
                        <input
                            type="file"
                            onChange={changeBackground}
                            className="hidden"
                            ref={inputBackground}
                        />
                        <span className="text-3xl mx-3">
                            <FileUpload color="inherit" fontSize="inherit" />
                        </span>
                        <span className="text-sm py-1">Upload Image</span>
                    </div>
                </div>
            </div>
            <div className="my-3 flex w-full items-center gap-3">
                <PrimaryButton className="w-full text-center flex justify-center">
                    {model ? "Update Slider" : "Tambah Slider"}
                </PrimaryButton>
                <DangerButton
                    onClick={() => {
                        setOpen(false);
                        setModel(null);
                        reset(
                            "direction_text",
                            "image",
                            "position",
                            "title",
                            "direction_text"
                        );
                    }}
                    className="w-full text-center flex justify-center"
                    type="button"
                >
                    Cancell
                </DangerButton>
            </div>
        </form>
    );
}
