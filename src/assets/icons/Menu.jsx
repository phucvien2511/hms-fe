function Menu(props) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    );
}

export default Menu;
