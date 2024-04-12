function Patient(props) {
    return (
        <svg
            width={24}
            height={24}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M18.75 12h-6a1.502 1.502 0 00-1.5 1.5V18H3v-7.5H1.5v12H3v-3h18v3h1.5v-6.75A3.755 3.755 0 0018.75 12zM21 18h-8.25v-4.5h6A2.253 2.253 0 0121 15.75V18z" />
            <path d="M7.125 12.75a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm0-1.5a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25zM15.75 4.5h-3v-3h-1.5v3h-3V6h3v3h1.5V6h3V4.5z" />
        </svg>
    );
}

export default Patient;
