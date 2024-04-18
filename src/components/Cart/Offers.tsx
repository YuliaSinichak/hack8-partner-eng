"use client";
import { inter, press_start } from "@/app/fonts";
import { toggleModal } from "@/redux/modalSlice";
import { toggleSponsorship } from "@/redux/sponsorshipSlice";
import { RootState } from "@/redux/store";
import { CardProps, ModalParams, dataItem } from "@/types";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

//TODO: тут треба описати вибіркові пакети
const explanation: {
  Basic: dataItem[];
  Preceptor: dataItem[];
  AdVantage: dataItem[];
  LEGO: dataItem[];
} = {
  Basic: [
    {
      heading: "Company logo on the brand wall and on the project website",
      details:
        "We will place the company's logo on the project's brand wall, as well as on the Hackathon website.",
    },
    {
      heading: "Promotion in social networks (company information).",
      details:
        "As part of the promotion, we will publish 1 Instagram story, 1 post on LinkedIn, and a post digest on the Telegram channel.        ",
    },
    {
      heading: "Logo and mention of your company in the post-project video.",
      details:
        "Adding the company logo to the video that will be created and posted on Instagram after the successful completion of the hackathon. We will also feature your company and its contribution to the event in this video as well.",
    },
    {
      heading: "Participation in networking",
      details:
        "Networking is a meeting between participants, organisers, and company representatives in an informal environment. This can be a great opportunity for students to find a job or an internship, and for companies to provide these opportunities. The duration of the event is approximately one hour.",
    },
  ],
  Preceptor: [
    {
      heading: "The possibility of involving a mentor and/or a judge.",
      details:
        "A mentor is a person who has experience and knowledge in the field in which the team works. They help participants solve problems that arise during the project development. During the event, there will be three mentoring sessions, two of which will be held on the first day of the event and one session on the second day. A judge is a person who evaluates projects developed by teams during a hackathon. Their responsibility will be to assess the quality of implementation, alignment with the hackathon theme, innovativeness, practical value, and other parameters. The person responsible for this position should be present on the second day of the event to evaluate the team's work.",
    },
    {
      heading: "Possibility to conduct a workshop or training among participants",
      details:
        "Workshop - is a type of interactive learning where participants engage in a series of educational activities. For example, it can be a demonstration, a practical session, or a discussion club. Training - is a specific type of learning aimed at enhancing the knowledge and skills of participants. Its main goal is to teach techniques, methods, and strategies that can be useful for solving specific tasks. For example, training in communication skills, project management, web technologies, etc.",
    },
    {
      heading: "Logo on T-shirts of all participants and organisers.",
      details:
        "Your company's logo will be printed on the backs of the t-shirts of all people present at the event, which they will receive at the opening of the Hackathon.",
    },
    {
      heading: "Post about the company on Instagram.",
      details:
        "We will publish a post about your company on our Instagram page, which will be available forever. In this post, we will provide information about your company and note that you are one of our main partners for this Hackathon.",
    },
  ],
  AdVantage: [
    {
      heading: "World cafe",
      details:
        "World Café is a method of interaction between a group of people aimed at exchanging ideas and co-creating through conversations on a predetermined topic in a relaxed atmosphere. Companies will be allocated 30 minutes to interact with participants.",
    },
    {
      heading: "Interactive Instagram stories",
      details:
        "Together with our team, we will create content for promoting Instagram stories on the organization's page*. For example, this could be stories like `Question-Answer`; `A Day in the Life of Our Employee,` and so on. The company will be able to create a maximum of 5 such Instagram stories.",
    },
    {
      heading: "Logo on posters",
      details:
        "The logo of your company will be printed on every poster that will be hung around the city.",
    },
    {
      heading: "«Treasure hunt» game",
      details:
        "During the live advertising week, which will take place a month before the project at the Lviv Polytechnic National University, gifts (merchandise) provided by your company will be placed on the premises of the educational institution, and hints for searching will be posted in Instagram-story format. After participants find the gifts, an Instagram story will be uploaded with the winners and a tag of your company. The company can provide up to three gifts.",
    },
  ],
  LEGO: [
    {
      heading: "World cafe",
      details:
        "World Café is a method of interaction between a group of people aimed at exchanging ideas and co-creating through conversations on a predetermined topic in a relaxed atmosphere. Companies will be allocated 30 minutes to interact with participants.",
    },
    {
      heading: "«Treasure hunt» game",
      details:
        "During the live advertising week, which will take place a month before the project at the Lviv Polytechnic National University, gifts (merchandise) provided by your company will be placed on the premises of the educational institution, and hints for searching will be posted in Instagram-story format. After participants find the gifts, an Instagram story will be uploaded with the winners and a tag of your company. The company can provide up to three gifts.",
    },
    {
      heading: "The possibility of involving a mentor and/or a judge.",
      details:
        "A mentor is a person who has experience and knowledge in the field in which the team works. They help participants solve problems that arise during the project development. During the event, there will be three mentoring sessions, two of which will be held on the first day of the event and one session on the second day. A judge is a person who evaluates projects developed by teams during a hackathon. Their responsibility will be to assess the quality of implementation, alignment with the hackathon theme, innovativeness, practical value, and other parameters. The person responsible for this position should be present on the second day of the event to evaluate the team's work.",
    },
    {
      heading: "Post about the company on Instagram.",
      details:
        "We will publish a post about your company on our Instagram page, which will be available forever. In this post, we will provide information about your company and note that you are one of our main partners for this Hackathon.",
    },
    {
      heading: "Participation in the creative mystery `Define solution`",
      details:
        "A multi-level challenge that potential project participants will solve independently. The mystery will begin a month before the project, during participant registration, and will continue until the start of the Hackathon. The task will be created by your company with the assistance of our team and will be aimed at identifying promising, initiative-driven students who possess important skills for you. You'll be able to review the CVs of the winners, contact them, and also reward them with your company's merchandise at the competition's closing ceremony.",
    },
    {
      heading: "Sending out job vacancies via a Telegram bot",
      details:
        "The telegram bot will send out the vacancies and other activities (courses, internships) for 6 months.",
    },
    {
      heading: "Placement of the company banner during the Hackathon",
      details:
        "The company provides the banner.",
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
  ],
};

const Card = ({
  name,
  price,
  services,
  annotation,
  active,
  compulsory,
  handleModal,
}: CardProps) => {
  const dispatch = useDispatch();

  const handleTogglePacket = () => {
    if (!compulsory) {
      dispatch(toggleSponsorship({ name }));
    }
  };

  return (
    <div className={"flex w-full"}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleTogglePacket();
        }}
        className={`cursor-pointer rounded-2xl w-full backdrop-blur-lg bg-black bg-opacity-30 flex flex-col border-grey justify-between gap-3 md:gap-5 p-8 lg:p-8 border-2 ${
          active ? "border-hack-green " : "border-neutral-500"
        }`}
      >
        <div className="flex w-full justify-between items-start max-w-xl ">
          <h5
            className={`${press_start.className} text-xl md:text-3xl self-center`}
          >
            {name}
          </h5>
          <button
            className={`${press_start.className} ${
              compulsory ? "cursor-auto" : "cursor-auto"
            } text-lg md:text-xl bg-black rounded-xl border-2 w-fit border-hack-green text-hack-green px-4 lg:px-10 py-2 self-center ml-5`}
          >{`${price}$`}</button>
        </div>
        <div className="w-full">
          {services.map((s, index) => (
            <li key={index} className={`${inter.className} text-md md:text-ld`}>
              {s}
            </li>
          ))}
        </div>
        <div className="flex flex-row-reverse justify-between items-end md:gap-4 gap-1 z-20">
          <button
            onClick={() => {
              handleModal({ name, modalData: explanation[name] as any });
            }}
          >
            <Image
              src="/info.svg"
              width={50}
              height={50}
              alt="info"
              className="md:w-12 w-8"
            />
          </button>
          {annotation && (
            <span className="text-gray-400 bg-black border border-gray-400 text-xs md:text-md md:py-3 py-1.5 md:px-4 px-2 rounded-lg h-fit">
              {annotation}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Offers() {
  const sellingPoints = useSelector((state: RootState) => state.sponsorship);

  const dispatch = useDispatch();

  const handleModal = ({ name, modalData }: ModalParams) =>
    dispatch(toggleModal({ name, modalData }));

  return (
    <section
      className=" relative min-h-screen flex flex-col justify-center items-center px-6 mx-5 w-full gap-8 my-10"
      id="offers"
    >
      <h2
        className={`${press_start.className} text-3xl text-hack-green my-16  md:text-5xl text-center self-center`}
      >
        Пропозиції
      </h2>
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-10 items-start">
      <div className="flex flex-col justify-center text-left lg:max-w-lg">
        <h2 className={`${press_start.className} text-white text-xl`}>10% of the funds received will support the Armed Forces of Ukraine.</h2>
        <p className={`${inter.className} text-gray-500 font-italic text-sm`}>*Payment will be made at the exchange rate of the National Bank of Ukraine.</p>
        <p className={`${inter.className} text-gray-300 my-5`}>Each project partner can join a charity fundraiser raffle for the Armed Forces of Ukraine on our social media. Among the people who donate, winners will be randomly selected and will receive gifts from partner companies.</p>
        <p className={`${inter.className} text-gray-300`}>Also, after the successful completion of the hackathon, you will receive a photo and video report from the organizers.</p>
      </div>
      <Image
          src="/Elipse.png"
          width={1000}
          height={1000}
          alt=" "
          className="hidden lg:flex absolute -right-32 bottom-12 pointer-events-none z-0"
       />
       <Image
          src="/BenyaOffers.png"
          width={600}
          height={600}
          alt=" "
          className="hidden lg:flex absolute -right-4 bottom-64 pointer-events-none levitate-bubbles2 z-0"
       />
       <Image
          src="/Hearts.png"
          width={300}
          height={300}
          alt=" "
          className="hidden lg:flex absolute right-80 bottom-24 pointer-events-none z-0 levitate-bubbles1"
       />
      <div className="flex flex-col self-center items-center justify-center gap-4 z-20">
        {sellingPoints.map((sp) => {
          return <Card key={sp.name} handleModal={handleModal} {...sp} />;
        })}
      </div>
      </div>
    </section>
  );
}
