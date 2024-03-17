import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/LayoutPage";
import { useForm, usePage } from "@inertiajs/react";
import { TextField } from "@mui/material";
import React from "react";

export default function Login() {
    const { profileWisata } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div className="relative h-[100vh] bg-slate-950">
            <div className="w-full h-full bg-[url(./storage/Image/mangrove.jpg)] bg-no-repeat bg-cover bg-center"></div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white bg-slate-950/30 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-8 lg:px-16">
                    <div>
                        <h3 className="font-bold text-xl md:text-2xl lg:text-4xl tracking-tight">
                            Selamat datang di website{" "}
                            {profileWisata.nama_wisata}
                        </h3>
                        <p className="font-extralight text-base lg:text-lg my-6 w-[70%]">
                            untuk dapat memperbaharui data pada sistem informasi
                            ini, anda perlu login terlebih dahulu. Silahkan
                            memasukkan email dan password yang benar untuk login
                            kedalam sistem informasi kami.
                        </p>
                    </div>
                    <div className="bg-white rounded-md py-1.5 px-3">
                        <div className="w-full justify-center flex py-6">
                            <h3 className="text-lg text-slate-950 tracking-tight font-semibold">
                                Halo, Admin. silahkan masukkan password yang
                                benar
                            </h3>
                        </div>
                        <form
                            onSubmit={loginHandler}
                            className="flex flex-col gap-3"
                        >
                            <TextField
                                className="w-full rounded-md overflow-hidden bg-white"
                                id="filled-basic"
                                value={data.email}
                                label="Email"
                                variant="filled"
                                name="email"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.email} />
                            <TextField
                                className="w-full rounded-md overflow-hidden bg-white"
                                id="filled-basic"
                                value={data.password}
                                label="password"
                                variant="filled"
                                name="password"
                                type="password"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.email} />

                            <PrimaryButton>Login</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
Login.layout = (page) => <Layout children={page} title={"Login"} />;
