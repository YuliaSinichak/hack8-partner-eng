"use client";
import Image from "next/image";

import { toggleModal } from "@/redux/modalSlice";
import { toggleOptionActive } from "@/redux/optionalSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { dataItem, iOptional, ModalParams } from "@/types";

import { press_start } from "@/app/fonts";

import { Checkbox } from "@/components/ui/checkbox";

//TODO: тут треба описати вибіркові пакети

const explanation: dataItem[] = [
  {
    heading: "Sending out job vacancies via a Telegram bot",
    details:
      "The telegram bot will send out the vacancies and other activities (courses, internships) for 6 months.",
  },
  {
    heading: "Placement of the company banner during the Hackathon",
    details:
      "The company provides the banner. ",
  },
  {
    heading: "Access to the CV database of participants",
    details:
      "This is an opportunity to access the CV database of participants selected for the hackathon.",
  },
  {
    heading: "Nomination from the company",
    details:
      "You can choose your nomination at the competition, which will be assigned to your company. You determine the winning team and award them with a prize. The nomination may refer to the use of certain technologies or other features of the team's work of your choice.",
  },
  {
    heading: "Participation in the creative mystery `Define solution`",
    details:
      "A multi-level challenge that potential project participants will solve independently. The mystery will begin a month before the project, during participant registration, and will continue until the start of the Hackathon. The task will be created by your company with the assistance of our team and will be aimed at identifying promising, initiative-driven students who possess important skills for you. You'll be able to review the CVs of the winners, contact them, and also reward them with your company's merchandise at the competition's closing ceremony.",
  },
];

const Option = ({ name, price, active }: iOptional) => {
  const dispatch = useDispatch();

  const handleToggleOption = () => {
    dispatch(toggleOptionActive({ name }));
  };

  const handleModal = ({ name, modalData }: ModalParams) =>
    dispatch(toggleModal({ name, modalData }));

  return (
    <div
      className={`flex w-full justify-between items-center md:py-4 py-2 px-2 sm:px-4 md:px-8 `}
    >
      <div className="flex items-center ">
        <Checkbox
          id={name}
          onCheckedChange={handleToggleOption}
          checked={active}
        />
        <label
          className="px-3 lg:text-2xl leading-none text-white cursor-pointer"
          htmlFor={name}
        >
          {name}
        </label>
      </div>

      <div className="right flex gap-2 md:gap-4 lg:px-4 align-middle">
        <div
          className={`${press_start.className} text-center md:text-md text-hack-green rounded-lg border-2 w-24 border-hack-green py-2 self-center`}
        >
          {`$${price}`}
        </div>

        <button
          onClick={() =>
            handleModal({ name: "Optional", modalData: explanation })
          }
        >
          <Image
            src="/info.svg"
            width={50}
            height={50}
            alt="info"
            className="h-12 w-12 min-w-[3rem]"
          />
        </button>
      </div>
    </div>
  );
};

export default function Offers() {
  const options = useSelector((state: RootState) => state.optionalPackets);

  return (
    <section className=" relative flex flex-col items-center justify-center px-6 mx-auto w-full max-w-5xl gap-8 my-12">
      <h2
        className={`${press_start.className} text-4xl md:text-4xl mt-16 text-hack-green  text-center z-10`}
      >
        Additional Options
      </h2>
      <Image
        src="/Elipse.png"
        width={1000}
        height={1000}
        alt=" "
        className="hidden lg:flex absolute self-center -top-64 opacity-100 pointer-events-none z-0"
      />
      <div className="flex flex-wrap justify-center border bg-black border-hack-green rounded-xl w-full z-10">
        {options.map((option) => {
          return <Option key={option.name} {...option} />;
        })}
      </div>
    </section>
  );
}
