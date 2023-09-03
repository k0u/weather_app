import React from "react";
import Modal from "react-modal";
import cities from "../cities";

Modal.setAppElement("#root");

function CityModal({ isOpen, onRequestClose, onCitySelect }) {
  const closeModal = () => {
    onRequestClose();
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      backgroundColor: "rgb(255,255,255)",
      maxWidth: "80%",
      maxHeight: "80%",
      padding: "20px",
      border: "none",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
      overflowY: "scroll",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select a City"
      className="modal"
      style={customStyles}
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h2 className="text-2xl font-bold mb-4">Select a City</h2>
        <ul>
          {cities.map((city) => (
            <li
              key={city}
              onClick={() => {
                onCitySelect(city);
                closeModal();
              }}
              className="cursor-pointer hover:bg-gray-200 py-2 px-4 mb-2 rounded"
            >
              {city}
            </li>
          ))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 p-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default CityModal;
