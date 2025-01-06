"use client";

import Image from "next/image";
import LaunchImg from "../../../public/Launch_SVG_Light.svg";

const Launch = () => {
  return (
    <section className="my-8 px-4 md:px-8">
      <h2 className="text-center text-xl font-bold mb-4 underline">
        Please support us on:
      </h2>
      <a
        href="https://peerlist.io/samyakshah/project/youclick"
        target="_blank"
        className="flex justify-center mt-10 cursor-pointer"
      >
        <Image src={LaunchImg} alt="launch" />
      </a>
    </section>
  );
};

export default Launch;
