export default function Pagination({
    page,
    totalPages,
    onPageChange
}) {

    if (totalPages <= 1) return null

    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className="flex gap-2 mt-4">

            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`
            px-3 py-1 border
            ${p === page ? "bg-blue-500 text-white" : ""}
          `}
                >
                    {p}
                </button>
            ))}

        </div>
    )
}