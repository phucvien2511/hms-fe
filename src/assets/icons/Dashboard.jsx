function Dashboard(props) {
    return (
        <svg
            width={24}
            height={24}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M19.5 15.75H18v3.75h1.5v-3.75zM16.5 12H15v7.5h1.5V12zM8.25 19.5a3.755 3.755 0 01-3.75-3.75H6a2.25 2.25 0 102.25-2.25V12a3.75 3.75 0 010 7.5z" />
            <path d="M21 1.5H3A1.502 1.502 0 001.5 3v18A1.502 1.502 0 003 22.5h18a1.502 1.502 0 001.5-1.5V3A1.502 1.502 0 0021 1.5zm0 6.75H10.5V3H21v5.25zM9 3v5.25H3V3h6zM3 21V9.75h18L21.002 21H3z" />
        </svg>
    );
}

export default Dashboard;
