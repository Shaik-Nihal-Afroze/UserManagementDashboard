import React from "react";

const Pagination = ({ total, limit, page, setPage, setLimit }) => {
  const totalPages = Math.ceil(total / limit);
  if (total === 0) return null;

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => goToPage(p)} className={`px-3 py-1 border rounded ${p === page ? "bg-blue-500 text-white" : ""}`}>{p}</button>
      ))}
      <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>

      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border p-1 rounded ml-2">
        {[5, 10, 20].map((l) => <option key={l} value={l}>{l} / page</option>)}
      </select>
    </div>
  );
};

export default Pagination;
