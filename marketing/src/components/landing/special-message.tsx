"use client";

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import Builder from "../../../public/samyak.jpg";

const SpecialMessage = () => {
  return (
    <div className="flex flex-col m-auto gap-10 p-4 w-full lg:w-[90%] mt-10 border-2 border-solid bg-gray-50 rounded-md ">
      <div className="text-center text-gray-900 font-bold text-xl underline">
        Special Message from our team!
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
        <div className="flex-1 flex items-center justify-center">
          <Image
            className="rounded-xl"
            width={400}
            height={300}
            src={Builder}
            alt="builder"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-center items-center">
          <div className="text-2xl font-bold">Hey there! 👋 </div>
          <div className="text-center w-[90%]">
            I am Samyak Shah, builder from India. I hope you are doing
            absolutely well. I hope you will love to use YouClick and it will
            help your favorite youtuber get that appreciation he/she deserves!
            Please note that we are in initial phase of development and
            constantly improving. If you find any bugs or have feature requests,
            please do so. You can join our{" "}
            <a href="#" target="_blank" className="text-red-500">
              discord community server
            </a>{" "}
            and we would love to here from you! 💝
          </div>
          <div>
            <div className="flex gap-2 pt-4">
              <a
                href="https://www.linkedin.com/in/samyakshah3008/"
                target="_blank"
              >
                <IconBrandLinkedin
                  className="text-red-400 cursor-pointer"
                  size={30}
                />
              </a>
              <a href="https://x.com/SamyakShah_18" target="_blank">
                <IconBrandX className="cursor-pointer" size={30} />
              </a>
              <a
                href="https://www.instagram.com/samyakshah_18/"
                target="_blank"
              >
                <IconBrandInstagram className="cursor-pointer" size={30} />
              </a>
              <a href="https://github.com/samyakshah3008" target="_blank">
                <IconBrandGithub className="cursor-pointer" size={30} />
              </a>
              <a href="https://samyaksshah.netlify.app/" target="_blank">
                <IconLink className="text-red-400 cursor-pointer" size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMessage;
