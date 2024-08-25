import DOMPurify from "dompurify";

const AdvertDescription = ({ description }) => {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="mb-4 text-gray-700">
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </div>
  );
};

export default AdvertDescription;