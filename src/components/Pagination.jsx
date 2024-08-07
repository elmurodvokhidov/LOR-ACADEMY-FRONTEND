import { MdFileDownload } from 'react-icons/md';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ data, page, setPage, limit, exportToExcel }) {
    const [currentPage, setCurrentPage] = useState(page);

    const totalPages = Math.ceil(data.length / limit);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 6) {
            // Agar jami sahifalar 6 dan kam yoki teng bo'lsa, barcha sahifa raqamlarini ko'rsatish
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Ko'p sahifalar mavjud bo'lganda, sahifa raqamlari to'plamini ellips(...) bilan ko'rsatish
            const leftEllipsisThreshold = 3;
            const rightEllipsisThreshold = totalPages - 2;

            // Birinchi ikkita sahifa raqamini ko'rsatish
            pageNumbers.push(1, 2);

            // Agar kerak bo'lsa, ellipsni ko'rsatish sharti
            if (currentPage > leftEllipsisThreshold + 1) {
                pageNumbers.push('...');
            }

            // Joriy sahifani va uning atrofidagi sahifalarni ko'rsatish
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 2 && i < totalPages - 1) {
                    pageNumbers.push(i);
                }
            }

            // Agar kerak bo'lsa, ellipsni ko'rsatish sharti
            if (currentPage < rightEllipsisThreshold - 1) {
                pageNumbers.push('...');
            }

            // Display the last two page numbers
            pageNumbers.push(totalPages - 1, totalPages);
        }
        return pageNumbers;
    };

    function handleClick(functionType) {
        if (functionType === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPage(currentPage - 1);
        } else if (functionType === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
        }
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 mt-10 p-3">
            {/* Pagination Controls */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => handleClick("prev")}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm pc:text-xl font-medium text-gray-700 hover:bg-gray-50 outline-primary-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => handleClick("next")}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm pc:text-xl font-medium text-gray-700 hover:bg-gray-50 outline-primary-2"
                >
                    Next
                </button>
            </div>

            {/* Page numbers */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm pc:text-xl text-gray-700">
                        Showing <span className="font-medium">{page}</span> to <span className="font-medium">{limit}</span> of{' '}
                        <span className="font-medium">{data.length}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => handleClick("prev")}
                            className="relative inline-flex items-center rounded-l-md p-2 pc:p-3 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 outline-primary-2"
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <FaChevronLeft aria-hidden="true" />
                        </button>

                        {/* Render page numbers */}
                        {generatePageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                className={`relative inline-flex items-center px-4 py-2 text-sm pc:text-xl font-semibold ${pageNumber === currentPage ? "text-gray-900" : "text-gray-700"
                                    } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 outline-primary-2`}
                                onClick={() => {
                                    if (pageNumber !== '...') {
                                        setCurrentPage(pageNumber);
                                        setPage(pageNumber);
                                    }
                                }}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() => handleClick("next")}
                            className="relative inline-flex items-center rounded-r-md p-2 pc:p-3 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 outline-primary-2"
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <FaChevronRight aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>


            <button
                disabled={data.length === 0}
                onClick={exportToExcel}
                id="downloadExelBtn"
                className="size-8 pc:size-10 relative float-end flex items-center justify-center ml-8 text-gray-400 border border-gray-300 outline-primary-2 text-xl pc:text-2xl rounded-full hover:text-cyan-600 hover:bg-blue-100 transition-all"
            >
                <MdFileDownload />
            </button>
        </div>
    );
}
