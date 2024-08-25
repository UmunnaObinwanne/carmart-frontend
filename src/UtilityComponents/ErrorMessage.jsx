const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-red-200 text-red-800 p-4 rounded-md shadow-md">
      <p>{message}</p>
    </div>
  </div>
);

export default ErrorMessage;
