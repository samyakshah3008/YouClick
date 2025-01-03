import { faqItems } from "@/constants/landing-page";
import { AccordionBlocks } from "../common/accordion-blocks";

const FAQs = () => {
  return (
    <div className="flex flex-col m-auto gap-5 p-4 w-full lg:w-[90%] mt-10 items-center">
      <div className="text-center text-gray-900 font-bold text-xl underline">
        Frequently Asked Questions!
      </div>
      <AccordionBlocks accordionItems={faqItems} />
    </div>
  );
};

export default FAQs;
