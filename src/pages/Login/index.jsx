import { useNavigate } from "react-router-dom";
import InputBlue from "../../components/InputBox/InputBlue";
import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
// import AuthApi from "../../apis/auth/authApi";
import bgLogin from "../../assets/images/bg-login.jpg";
import { Alert } from "@mui/material";

// const DEMO_USER = { username: "trtuananh", password: "123", id: "1" };

function loginInfoReducer(state, action) {
    switch (action.type) {
        case "username":
            return { ...state, username: action.value };
        case "password":
            return { ...state, password: action.value };
        default:
            return state;
    }
}
const accountList = [
    { username: "admin", password: "admin" },
    { username: "btl", password: "12345" },
    { username: "vmp2511", password: "12345" },
];
async function handleLogin(
    loginInfo,
    setLoading,
    setCookie,
    removeCookie,
    setError
) {
    // try to login through a fetch request, if success, navigate to home if fail do nothing
    //check if username and password are
    if (loginInfo.username !== "" && loginInfo.password !== "") {
        setLoading(true);
        //let skip = false;
        //check if match account in accountList
        for (let i = 0; i < accountList.length; i++) {
            if (
                loginInfo.username === accountList[i].username &&
                loginInfo.password === accountList[i].password
            ) {
                setLoading(false);
                removeCookie("user", { path: "/" });
                setCookie(
                    "user",
                    {
                        username: loginInfo.username,
                        password: loginInfo.password,
                    },
                    { path: "/" }
                );
            } else {
                setLoading(false);
                setError(true);
            }
        }
        //if (loginInfo.username === "admin" && loginInfo.password === "admin") {
        //     setLoading(false);
        //     removeCookie("user", { path: "/" });
        //     setCookie(
        //         "user",
        //         { username: "admin", password: "admin" },
        //         { path: "/" }
        //     );
        // } else {
        //     setLoading(false);
        //     setError(true);
        // }
        // const authApi = new AuthApi(); // Create an instance of AuthApi

        // try {
        //     const res = await authApi.login(
        //         loginInfo.username,
        //         loginInfo.password
        //     );
        //     // const res = await fetch("http://localhost/minathon/backend/User/login", {
        //     //     method: "POST",
        //     //     headers: {
        //     //     "Content-Type": "application/json",
        //     //     },
        //     //     body: JSON.stringify({
        //     //     username: loginInfo.username,
        //     //     password: loginInfo.password,
        //     //     }),
        //     // });

        //     const json = await res.json();

        //     if (!skip) {
        //         if (json.id) {
        //             setLoading(false);
        //             removeCookie("user", { path: "/" });
        //             setCookie("user", json, { path: "/" });
        //         } else {
        //             throw new Error("Wrong username or password");
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        //     setError(true);
        // }
    }
}

export default function Login() {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const [loginInfo, dispatchLoginInfo] = useReducer(loginInfoReducer, {
        username: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    useEffect(() => {
        if (cookies.user) {
            nav("/");
        }
    }, [cookies, nav]);

    return (
        <div className="w-screen h-screen flex flex-row">
            <div
                className={
                    "h-full w-2/3 object-cover bg-center flex items-center justify-center gap-1 absolute z-10 transition-all"
                }
            >
                <div className="flex flex-col text-center text-6xl font-extrabold text-white gap-7">
                    <div>H</div>
                    <div>O</div>
                    <div>S</div>
                    <div>P</div>
                    <div>I</div>
                    <div>B</div>
                    <div>K</div>
                </div>
            </div>
            <div className={"w-2/3 h-full z-0"}>
                <img
                    src={bgLogin}
                    className="h-full object-cover object-center"
                    alt="login background"
                />
            </div>
            <div className="w-1/3 h-full right-0 absolute pl-10 pr-10 flex flex-col gap-10 items-stretch justify-center z-10">
                <div className="text-6xl font-bold">Đăng nhập</div>
                {error && (
                    <Alert severity="error">
                        Sai tên đăng nhập hoặc mật khẩu
                    </Alert>
                )}
                <div className="flex flex-col gap-4">
                    <InputBlue
                        label="Tên đăng nhập"
                        type="text"
                        value={loginInfo.username}
                        onChange={(e) =>
                            dispatchLoginInfo({
                                type: "username",
                                value: e.target.value,
                            })
                        }
                        required
                    />
                    <InputBlue
                        label="Mật khẩu"
                        type="password"
                        value={loginInfo.password}
                        onChange={(e) =>
                            dispatchLoginInfo({
                                type: "password",
                                value: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="flex flex-row gap-4 justify-start items-center">
                    <button
                        className={`${
                            !loading && error
                                ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
                                : ""
                        }`}
                        onClick={() => {
                            if (!loading) setError(false);
                            handleLogin(
                                loginInfo,
                                setLoading,
                                setCookies,
                                removeCookies,
                                setError
                            );
                        }}
                    >
                        {!loading ? (
                            "Log in"
                        ) : (
                            <div
                                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-primary rounded-full"
                                role="status"
                                aria-label="loading"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </button>

                    {/* <a className="italic" href="./login">
                        Forgot Password?
                    </a> */}
                </div>
            </div>
        </div>
    );
}
