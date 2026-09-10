import { Link } from "react-router";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface NextPageButtonProps {
    label?: string;
}

function NextPageButton({ label = "Conheça a solução" }: NextPageButtonProps) {
    return (
        <Link
            to="/sobre"
            className="mt-6 inline-flex items-center rounded-lg bg-[#323A99] px-5 py-3 font-semibold text-white no-underline transition-colors duration-300 hover:bg-[#6B46C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#323A99] gap-2"
        >
            {label} <span className="animate-[content-move_1s_ease-in-out_infinite_alternate]"><FaArrowAltCircleRight/></span>
        </Link>
    );
}

export default NextPageButton;
