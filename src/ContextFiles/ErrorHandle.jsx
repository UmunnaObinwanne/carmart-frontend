import { createContext, useState, useContext } from "react";
import Modal from "react-modal";

const GlobalErrorContext = createContext();

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setError(null);
    window.location.href = "/login";
  };

  return (
    <GlobalErrorContext.Provider value={handleError}>
      {children}
      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        contentLabel="Unauthorized Access"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Unauthorized Access</h2>
        <p>{error}</p>
        <button onClick={handleClose}>OK</button>
      </Modal>
    </GlobalErrorContext.Provider>
  );
};
