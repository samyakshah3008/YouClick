"use client";

import Lottie from "lottie-react";
import CommentAnimation from "../../../public/comment-animation.json";
import LikeBtnAnimation from "../../../public/like-animation.json";
import SubscribeAnimation from "../../../public/subscribe-animation.json";

const Features = () => {
  return (
    <div className="flex flex-col m-auto gap-5 p-4 w-full lg:w-[90%] mt-10">
      <div className="text-center text-gray-900 font-bold text-xl underline">
        Sneak Peek to Our Features
      </div>
      <div className="flex flex-col gap-10 bg-gray-50 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3">
            <Lottie
              animationData={LikeBtnAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-lg font-bold text-gray-900">Automated Like</h3>
            <p className="text-sm text-gray-600">
              Effortlessly engage with content using our automated like feature
              on a "single click"
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3">
            <Lottie
              animationData={CommentAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-lg font-bold text-gray-900">
              Automated Comment
            </h3>
            <p className="text-sm text-gray-600">
              Generate engaging comments tailored to the content automatically
              on a "single click"
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3">
            <Lottie
              animationData={SubscribeAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-lg font-bold text-gray-900">
              Automated Subscribe
            </h3>
            <p className="text-sm text-gray-600">
              Seamlessly subscribe to channels and stay updated with the latest
              on a "single click"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
