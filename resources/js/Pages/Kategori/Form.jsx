import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import React, { useEffect } from "react";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({ kategori: "" });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("kategori-create"), { onSuccess: () => setOpen(false) });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("kategori-create"), {
            onSuccess: () => {
                setOpen(false);
                setModel(null);
            },
            preserveScroll: true,
        });
    };
    useEffect(() => {
        setData({
            ...data,
            kategori: model ? model.kategori : "",
            id: model ? model.id : "",
        });
    }, [model]);
    return (
        <form onSubmit={model ? updateHandler : submitHandler} className="my-2">
            <TextField
                className="w-full rounded-md overflow-hidden bg-white"
                id="filled-basic"
                value={data.kategori}
                label="Kategori"
                variant="filled"
                name="kategori"
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputError message={errors.kategori} />
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
