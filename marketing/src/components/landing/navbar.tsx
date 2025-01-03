"use client";

import { IconBrandGithub, IconThumbUp } from "@tabler/icons-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex gap-2 font-medium">
            <IconThumbUp /> YouClick
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <Button
            onClick={() => {
              if (!window) return;
              window.open(
                "https://github.com/samyakshah3008/YouClick",
                "_blank"
              );
            }}
          >
            <IconBrandGithub className="mr-2" /> Star on GitHub
          </Button>
          <Button
            variant="secondary"
            onClick={() => {}}
            className="hidden lg:block "
          >
            Request for Free Access 🚀
          </Button>
        </div>
      </div>
    </nav>
  );
}
