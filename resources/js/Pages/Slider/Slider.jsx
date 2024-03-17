import { LazyLoadImage } from "react-lazy-load-image-component";
import { Slide } from "react-slideshow-image";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, usePage } from "@inertiajs/react";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import Modal from "@/Components/Modal";
import Form from "./Form";
export default function Slider({ slider, ...props }) {
    const { auth } = usePage().props;
    const [model, setModel] = useState(null);
    const tambahHandler = () => {
        setModalTambah(true);
    };
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const editHandler = (value) => {
        setModalTambah(true);
        setModel(value);
    };

    return (
        <>
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
                        href={route("slider-delete", { id: model?.id })}
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
            <Modal
                maxWidth="3xl"
                show={modalTambah}
                onClose={() => setModalTambah(false)}
            >
                <div className="border-b border-slate-950/50 h-1 py-8 px-4">
                    {model ? "Update Slider" : "Tambah Slider"}
                </div>
                <Form
                    model={model}
                    setModel={setModel}
                    setOpen={setModalTambah}
                />
            </Modal>

            {slider.length == 0 && (
                <div className="w-full h-[250px] bg-slate-600 flex flex-col items-center justify-center gap-y-7">
                    <p className="text-white w-[50%] text-center text-lg md:text-2xl">
                        Belum ada slider yang ditambahkan. silahkan menambahkan
                        slider baru, dengan menekan tombol dibawah
                    </p>
                    <PrimaryButton onClick={() => setModalTambah(true)}>
                        Tambah Slider Baru
                    </PrimaryButton>
                </div>
            )}
            <Slide>
                {slider.length > 0 ? (
                    slider.map((item, index) => {
                        let position = "justify-center";
                        if (item.position == "left") {
                            position = "justify-start";
                        } else if (item.position == "center") {
                            position = "justify-center";
                        } else if (item.position == "right") {
                            position = "justify-end";
                        }
                        return (
                            <div key={index} className="each-slide-effect">
                                <div
                                    style={{
                                        backgroundImage: `url(./storage/${item.imageBackground})`,
                                    }}
                                ></div>
                                <div className="bg-slate-950/90 w-full h-full absolute left-0 top-0">
                                    <div
                                        className={`flex flex-col justify-center h-full w-full text-white`}
                                    >
                                        <div
                                            className={`flex w-full ${position} px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out`}
                                        >
                                            <div
                                                className={`w-full
                                            }`}
                                            >
                                                <div
                                                    className={`flex  ${
                                                        item.direction_text ==
                                                        "left"
                                                            ? "flex-row"
                                                            : "flex-row-reverse"
                                                    } gap-4 items-center transition-all duration-300 ease-in-out`}
                                                >
                                                    <LazyLoadImage
                                                        src={
                                                            "/storage/" +
                                                            item.image
                                                        }
                                                        alt=""
                                                        className={`w-[100px] md:w-[300px] h-[100px] md:h-[300px] object-cover transition-all duration-300 ease-in-out rounded-lg`}
                                                    />
                                                    <div className="w-full lg:w-[60%] transition-all duration-300 ease-in-out">
                                                        <h1
                                                            className={`text-lg md:text-xl lg:text-2xl font-bold ${
                                                                item.direction_text ==
                                                                "right"
                                                                    ? "text-right"
                                                                    : ""
                                                            } font-extrabold transition-all duration-300 ease-in-out `}
                                                        >
                                                            {item.title}
                                                        </h1>
                                                        <p
                                                            className={` ${
                                                                item.direction_text ==
                                                                "right"
                                                                    ? "text-right"
                                                                    : ""
                                                            } text-xs md:text-base lg:text-lg font-light transition-all duration-300 ease-in-out`}
                                                        >
                                                            {item.tagline}
                                                        </p>
                                                        {auth.user && (
                                                            <div
                                                                className={`${
                                                                    item.direction_text ==
                                                                    "right"
                                                                        ? "justify-end"
                                                                        : "justify-start"
                                                                } flex  gap-3 items-center my-5 w-full `}
                                                            >
                                                                <PrimaryButton
                                                                    onClick={
                                                                        tambahHandler
                                                                    }
                                                                >
                                                                    Tambah
                                                                    Slider
                                                                </PrimaryButton>
                                                                <SecondaryButton
                                                                    onClick={() =>
                                                                        editHandler(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </SecondaryButton>
                                                                <DangerButton
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </DangerButton>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Skeleton variant="rectangular" animation="wave" />
                )}
            </Slide>
        </>
    );
}
