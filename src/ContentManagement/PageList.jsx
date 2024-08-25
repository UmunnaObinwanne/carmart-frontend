import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PageList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${apiUrl}/pages`);
        if (!response.ok) {
          throw new Error("Failed to fetch pages");
        }
        const data = await response.json();
        // Directly use the data without extra mapping since it's already in the correct format
        const formattedPages = data.map((page) => ({
          id: page._id,
          title: page.title,
          slug: page.slug,
          description: page.description,
          content: page.content,
          updatedAt: page.updatedAt,
        }));
        setPages(formattedPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Published Pages</h1>
      {pages.length > 0 ? (
        <ul className="space-y-4">
          {pages.map((page) => (
            <li key={page.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {page.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {page.description || "No description available"}
              </p>
              <Link
                to={`/${page.slug}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Read more
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No pages available.</p>
      )}
    </div>
  );
};

export default PageList;
