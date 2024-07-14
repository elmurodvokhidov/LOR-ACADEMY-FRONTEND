import { FaPlus } from "react-icons/fa"

export const GlobalButton = ({ setModal }) => {
    return (
        <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 text-white bg-primary-2 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-primary-1 font-medium rounded-lg text-sm pc:text-xl px-5 py-2.5 text-center dark:bg-primary-2 dark:hover:bg-primary-3 dark:focus:ring-primary-1"
            type="button"
        >
            Yangi qo'shish <FaPlus />
        </button>
    )
}
