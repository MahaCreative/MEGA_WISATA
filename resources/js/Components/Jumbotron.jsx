import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Jumbotron({
    image,
    title,
    tagline,
    textalign = "right",
}) {
    return (
        <div
            className={`w-full h-[500px] bg-[url(./storage/Image/mangrove.jpg)] bg-no-repeat bg-cover object-center relative`}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/50 flex flex-row items-center">
                <div
                    className={`flex ${
                        textalign == "right" ? "" : "flex-col-reverse"
                    } items-center gap-8 px-4 md:px-8 lg:px-16 transition-all duration-300 ease-out`}
                >
                    <LazyLoadImage
                        src={`${image ? image : "/storage/"} `}
                        alt=""
                        className=" transition-all duration-300 ease-out lg:w-[400px] md:w-[300px] w-[150px] lg:h-[300px] md:h-[300px] h-[150px] rounded-lg shadow-[30px_35px_10px] shadow-gray-800/50 relative"
                    />
                    <div>
                        <h1 className="transition-all duration-300 ease-out text-3xl md:text-4xl lg:text-6xl font-extrabold text-white tracking-tight">
                            {title}
                        </h1>
                        <p className="transition-all duration-300 ease-out text-white lg:w-[80%] font-extralight leading-tight tracking-tight text-lg md:text-xl lg:text-2xl">
                            {tagline}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
