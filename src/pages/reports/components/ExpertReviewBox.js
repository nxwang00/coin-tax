import React, { useState } from "react";
import ExpertPhoto from "../../../assets/imgs/expert-photo.jpg";
import ProfessionalModal from "./ProfessionalModal";
import ChatBox from "./ChatBox";

const ExpertReview = (props) => {
  const [isProfessionalModal, setIsProfessionalModal] = useState(false);
  const [chatStart, setChatStart] = useState(false);

  const onProfessionalClick = () => {
    setIsProfessionalModal(true);
  };

  const onChatStart = () => {
    setIsProfessionalModal(false);
    setChatStart(true);
  };

  return (
    <div className="border border-solid border-gray-300 rounded p-6 mt-4 bg-white">
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={ExpertPhoto}
          alt="user avatar"
        />
        <div className="ml-6">
          <div className="font-bold text-2xl text-gray-800 py-1">
            Get An Expert Review
          </div>
          <div className="text-sm text-gray-500 py-1">
            Have an expert review your imported data and provide guidance on
            your account.
            <span
              className="ml-4 inline-flex items-center font-medium text-blue-600 hover:underline text-base cursor-pointer"
              onClick={onProfessionalClick}
            >
              Add Tax Professional
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <ProfessionalModal
        isOpen={isProfessionalModal}
        onClose={() => setIsProfessionalModal(false)}
        onChatStart={onChatStart}
      />
      {chatStart && <ChatBox onChatFinish={() => setChatStart(false)} />}
    </div>
  );
};

export default ExpertReview;
