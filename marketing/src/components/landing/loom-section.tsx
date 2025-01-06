"use client";

export default function LoomSection() {
  return (
    <section className="my-8 px-4 md:px-8">
      <h2 className="text-center text-xl font-bold mb-4 underline">
        How to Install Guide:
      </h2>
      <div className="flex justify-center">
        <iframe
          src="https://www.loom.com/embed/af6b23ec74714221be0d28f8b2c68670"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full md:w-3/4 aspect-video rounded-lg shadow-lg"
        ></iframe>
      </div>
    </section>
  );
}
