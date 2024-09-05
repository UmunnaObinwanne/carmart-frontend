import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const PageDetails = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const data = await response.json();
        setPage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32">
      {page && (
        <article className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {page.title}
            </h1>
          </div>
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page.content),
            }}
          />
        </article>
      )}
    </div>
  );
};

export default PageDetails;
