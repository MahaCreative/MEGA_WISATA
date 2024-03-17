import { usePage } from "@inertiajs/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NewPost() {
    const { newPost } = usePage().props;
    console.log(newPost);
    return (
        <>
            <h3 className="font-semibold text-white text-xl my-3">
                Informasi Terbaru
            </h3>
            {newPost.length > 0 ? (
                newPost.map((item, key) => (
                    <div>
                        <div
                            key={key}
                            className="flex gap-4 items-center my-2 hover:bg-slate-900 p-1 rounded-md hover:cursor-pointer"
                        >
                            <LazyLoadImage
                                src={"/storage/" + item.thumbnail}
                                alt=""
                                className="h-[50px] w-[50px] object-cover rounded-lg"
                            />
                            <div>
                                <h3 className="text-sm font-semibold tracking-tight text-white border-b border-blue-600 inline-block pr-3 mb-2 line-clamp-1">
                                    {item.judul}
                                </h3>
                                <p
                                    className="w-[200px] line-clamp-2 text-xs text-gray-50"
                                    dangerouslySetInnerHTML={{
                                        __html: item.text,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="w-full bg-slate-900">
                    {" "}
                    belum ada informasi yang baru saja di tambahkan
                </p>
            )}
        </>
    );
}
