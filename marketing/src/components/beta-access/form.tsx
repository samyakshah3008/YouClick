"use client";

import { IconArrowBack } from "@tabler/icons-react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BetaAccessForm = ({ status }: any) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    useCase: "",
    favoriteYoutuber: "",
    starredRepo: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (status == "pending") {
      setIsSubmitted(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://you-click-server.vercel.app/api/v1/beta-access/submit",
        formData
      );
      setCookie("status", "pending", {
        maxAge: 60 * 60 * 24 * 365 * 10,
      });
      setIsSubmitted(true);
      router.push("/");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const goBackHandler = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex gap-5 flex-col items-center justify-center h-screen bg-gray-100">
        <div
          onClick={goBackHandler}
          className="flex gap-2 text-red-500 font-semibold underline cursor-pointer"
        >
          {" "}
          <IconArrowBack /> Go back
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
          <h1 className="text-xl font-semibold text-green-500">Thank You!</h1>
          <p className="text-gray-600 mt-2">
            Your beta access request has been submitted. Please wait for
            approval. You will receive an email once approved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-gray-100">
      <div
        onClick={goBackHandler}
        className="flex gap-2 text-red-500 font-semibold underline cursor-pointer"
      >
        {" "}
        <IconArrowBack /> Go back
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-md w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Beta Access Form
        </h1>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            How do you plan to use YouClick?
          </label>
          <textarea
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            value={formData.useCase}
            onChange={(e) =>
              setFormData({ ...formData, useCase: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Who is your favorite YouTuber?
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            value={formData.favoriteYoutuber}
            onChange={(e) =>
              setFormData({ ...formData, favoriteYoutuber: e.target.value })
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="starredRepo"
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            checked={formData.starredRepo}
            onChange={(e) =>
              setFormData({ ...formData, starredRepo: e.target.checked })
            }
          />
          <label htmlFor="starredRepo" className="text-gray-700">
            Have you starred the repo?
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BetaAccessForm;
