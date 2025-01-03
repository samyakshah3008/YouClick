"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import Lottie from "lottie-react";
import LandingPageDart from "../../../public/you-tube-logo-animation.json";
import { Button } from "../ui/button";
import { Highlight } from "../ui/hero-highlight";

function Hero() {
  return (
    <main className="container mx-auto px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-[200px] m-auto">
          <Lottie
            animationData={LandingPageDart}
            loop={true}
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-bricolage">
          Support your favorite YouTuber with
          <span className=" text-red-500"> YouClick! </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Free, open source forever, aims to make win-win situation for both
          youtuber and consumer!
          <br />
          <Highlight>
            Say goodbye to manual like, comment and subscribe!
          </Highlight>
        </p>

        <div className="my-6 flex flex-wrap justify-center gap-4">
          <Button onClick={() => {}} size="lg">
            Request for Free Access 🚀
          </Button>
          <Button
            onClick={() => {
              if (!window) return;
              window.open(
                "https://github.com/samyakshah3008/YouClick",
                "_blank"
              );
            }}
            size="lg"
            variant="secondary"
          >
            <IconBrandGithub className="mr-2" />
            View on GitHub
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Hero;
