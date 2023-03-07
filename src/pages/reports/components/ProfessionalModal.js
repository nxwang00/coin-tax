import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DateTimePicker from "react-datetime-picker";
import { MOCKUP_PROFESSIONALS } from "../../../services/mockus";

const ProfessionalModal = (props) => {
  const { isOpen, onClose, onChatStart } = props;

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [message, setMessage] = useState("");
  const [messageErr, setMessageErr] = useState("");

  const [expertType, setExpertType] = useState("user_professional");
  const [chatType, setChatType] = useState("");

  const [professional, setProfessional] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());

  const onScheduleCallSubmit = () => {
    setChatType("");
    onClose();
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);

    // form field validation
    if (e.target.value) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!mailformat.test(e.target.value)) {
        setEmailErr("The Email field is not a valid e-mail address.");
      } else {
        setEmailErr("");
      }
    } else {
      setEmailErr("The Email field is required.");
    }
  };

  const onMessageChanged = (e) => {
    setMessage(e.target.value);
    if (e.target.value) setMessageErr("");
    else setMessageErr("The Message field is required.");
  };

  const onStartChat = () => {
    setChatType("start chat");
    onChatStart();
  };

  const onScheduleCall = () => {
    setChatType("schedule call");
  };

  const onSubmitClicked = () => {};

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      classNames={{
        modal: "reactModal",
      }}
      center
    >
      <div className="py-4 px-2">
        <span className="font-medium">Tax Professional</span>
        <div className="mt-4">
          <div className="flex items-center my-1">
            <input
              checked={expertType === "user_professional"}
              id="radio-1"
              type="radio"
              value="user_professional"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              onChange={(e) => setExpertType(e.target.value)}
            />
            <label htmlFor="radio-1" className="ml-2 text-sm text-gray-700">
              Email Your Tax Professional
            </label>
          </div>
          <div className="flex items-center my-1">
            <input
              checked={expertType === "admin_professional"}
              id="radio-2"
              type="radio"
              value="admin_professional"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              onChange={(e) => setExpertType(e.target.value)}
            />
            <label htmlFor="radio-2" className="ml-2 text-sm text-gray-700">
              Get in touch with our Tax Professional Partner
            </label>
          </div>
        </div>
        <div className="mt-10 h-64">
          {expertType === "user_professional" ? (
            <form className="space-y-4 md:space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={onEmailChanged}
                />
                {emailErr && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                    {emailErr}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message<span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-solid border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={message}
                  onChange={onMessageChanged}
                ></textarea>
                {messageErr && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                    {messageErr}
                  </p>
                )}
              </div>
              <div className="mt-6 flex items-center justify-end">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-solid border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                {emailErr || messageErr ? (
                  <button
                    type="button"
                    className="text-white bg-blue-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2 text-center"
                    disabled
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                    onClick={onSubmitClicked}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-solid border-gray-400 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                  onClick={onStartChat}
                >
                  Start Chat
                </button>
                <button
                  type="button"
                  className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-solid border-gray-400 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                  onClick={onScheduleCall}
                >
                  Schedule Video Call
                </button>
              </div>
              <p className="text-xs text-yellow-500 mt-1">
                To enable, select the "Schedule Video Call"
              </p>
              {chatType === "schedule call" && (
                <Fragment>
                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Professional
                    </label>
                    <select
                      className="block w-full px-2 py-1.5 text-sm text-gray-900 border border-solid border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      value={professional}
                      onChange={(e) => setProfessional(e.target.value)}
                    >
                      {MOCKUP_PROFESSIONALS.map((professional) => (
                        <option value={professional.id} key={professional.id}>
                          {professional.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Time Slot
                    </label>
                    <DateTimePicker
                      onChange={(val) => setDateTime(val)}
                      value={dateTime}
                      format="y-MM-dd hh:mm:ss"
                      className="w-full rounded border border-solid border-gray-300 pt-1 pb-0.5 px-2 text-sm"
                    />
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={onScheduleCallSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProfessionalModal;
