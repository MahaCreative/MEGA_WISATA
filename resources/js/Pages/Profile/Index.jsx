import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/LayoutPage";
import { useForm, usePage } from "@inertiajs/react";
import { TextField } from "@mui/material";
import React from "react";

export default function Index() {
    const { profileWisata } = usePage().props;
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email_lama: auth.user.email,
        email_baru: "",
        name: auth.user.name,
        password: "",
    });
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("setting-profile"), {
            onSuccess: reset("password", "email_baru"),
        });
    };
    return (
        <div className="relative h-[100vh] bg-slate-950">
            <div className="w-full h-full bg-[url(./storage/Image/mangrove.jpg)] bg-no-repeat bg-cover bg-center"></div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white bg-slate-950/30 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-8 lg:px-16 items-center">
                    <div>
                        <h3 className="font-bold text-xl md:text-2xl lg:text-4xl tracking-tight">
                            Perbaharui Profile User
                        </h3>
                        <p className="font-extralight text-base lg:text-lg my-6 w-[70%]">
                            Selamat datang, di halaman Perbaharui profile user,
                            silahkan mengisi form data jika anda ingin
                            memperbaharui profile anda.
                        </p>
                    </div>
                    <div className="bg-white rounded-md py-1.5 px-3">
                        <div className="w-full justify-center flex py-6">
                            <h3 className="text-lg text-slate-950 tracking-tight font-semibold">
                                Halo, {auth.user.name}
                            </h3>
                        </div>
                        <form
                            onSubmit={loginHandler}
                            className="flex flex-col gap-3"
                        >
                            <TextField
                                disabled
                                className="w-full rounded-md overflow-hidden bg-white"
                                id=""
                                value={data.email_lama}
                                label="Email Lama"
                                name="email_lama"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputLabel>
                                *Biarkan kosong jika tidak ingin memperbaharui
                                email
                            </InputLabel>
                            <TextField
                                className="w-full rounded-md overflow-hidden bg-white"
                                id="filled-basic"
                                value={data.email_baru}
                                label="Email baru"
                                name="email_baru"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.email_baru} />
                            <TextField
                                className="w-full rounded-md overflow-hidden bg-white"
                                id="filled-basic"
                                value={data.name}
                                label="name"
                                name="name"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.name} />
                            <InputLabel>
                                *Biarkan kosong jika tidak ingin memperbaharui
                                password
                            </InputLabel>
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
                            <InputError message={errors.password} />
                            <PrimaryButton>Update Profile</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <Layout children={page} title={"Setting Profile User"} />
);
