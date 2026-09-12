import { Link } from "react-router";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import type { MouseEvent } from "react";

interface NextPageButtonProps {
    label?: string;
    page?: string;
    className?: string;
}

function NextPageButton({ label = "Prosseguir", page = "sobre", className = "" }: NextPageButtonProps) {
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        navigate(`/${page}`);
        window.scrollTo(0, 0);
    };

    return (
        <Link
            to={`/${page}`}
            onClick={handleClick}
            className={`content-fade-in inline-flex items-center gap-2 rounded-lg bg-[#323A99] px-5 py-3 font-semibold text-white no-underline transition-all duration-300 hover:scale-105 hover:bg-[#6B46C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#323A99] ${className}`}
        >
            {label} <span className="animate-[content-move_0.5s_ease-in_infinite_alternate]"><FaArrowAltCircleRight/></span>
        </Link>
    );
}

export default NextPageButton;
