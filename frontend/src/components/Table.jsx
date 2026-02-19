const Table = ({
  books,
  savedIds = [],
  toggleSave,
  showUnsave = false,
  onUnsave
}) => {
  if (!books?.length) return <p>No books available</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <div key={book._id} className=" dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-200 dark:border-gray-700-xl shadow p-4 flex flex-col rounded-xl">

          <img
            src={
              book.cover
                ? `${import.meta.env.VITE_API_URL}/uploads/covers/${book.cover}`
                : "/no-image.png"
            }
            className="h-60 object-cover rounded"
          />

          <h3 className="font-semibold mt-3">{book.title}</h3>
          <p className="text-sm dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-200 dark:border-gray-700">Author - {book.author}</p>
          <p className="text-sm  dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-200 dark:border-gray-700">Category - {book.category}</p>

          <div className="flex justify-between mt-auto pt-4">

            <a
              href={`${import.meta.env.VITE_API_URL}/uploads/books/${book.pdf}`}
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600  text-white px-3 py-1 rounded"
            >
              PDF
            </a>

            {showUnsave ? (
              <button
                onClick={() => onUnsave(book._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => toggleSave(book._id)}
                className={`px-3 py-1 rounded text-white ${
                  savedIds.includes(book._id)
                    ? "bg-green-500"
                    : "bg-indigo-500"
                }`}
              >
                {savedIds.includes(book._id) ? "Saved" : "Save"}
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
