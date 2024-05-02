import { useNavigate } from "react-router-dom";
import InputBlue from "../../components/InputBox/InputBlue";
import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from '../../apis/auth/authApi';
import bgLogin from '../../assets/images/bg-login.jpg';

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

async function handleLogin(
  loginInfo,
  setLoading,
  setCookie,
  removeCookie,
  setError
) {
  // try to login through a fetch request, if success, navigate to home if fail do nothing
  if (loginInfo.username !== "" && loginInfo.password !== "") {
    setLoading(true);
    let skip = false;

    const authApi = new AuthApi(); // Create an instance of AuthApi

    try {
        const res = await authApi.login(loginInfo.username, loginInfo.password);
        // const res = await fetch("http://localhost/minathon/backend/User/login", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //     username: loginInfo.username,
        //     password: loginInfo.password,
        //     }),
        // });

        const json = await res.json();

        if (!skip) {
            if (json.id) {
                setLoading(false);
                removeCookie("user", { path: "/" });
                setCookie("user", json, { path: "/" });
            } else {
                throw new Error("Wrong username or password");
            }
        }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
}

async function handleSignup(
  loginInfo,
  phoneNum,
  setLoading,
  setError,
  setCookie
) {
  // try to login through a fetch request, if success, navigate to home if fail do nothing
  if (loginInfo.username !== "" && loginInfo.password !== "") {
    setLoading(true);
    let skip = false;

    const authApi = new AuthApi(); // Create an instance of AuthApi

    try {
        const res = await authApi.signup(loginInfo.username, loginInfo.password, phoneNum);
    //   const res = await fetch("http://localhost/minathon/backend/User/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: loginInfo.username,
    //       sdt: phoneNum,
    //       password: loginInfo.password,
    //     }),
    //   });

        const json = await res.json();

        if (!skip) {
            setLoading(false);
            setCookie("user", json, { path: "/" });
        }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
    }
  }
}

export default function Login() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loginInfo, dispatchLoginInfo] = useReducer(loginInfoReducer, {
    username: "",
    password: "",
  });
  const [signupPassword, setSignupPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) {
      nav("/home");
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
        <div className="text-6xl font-bold">
          {isSigningUp ? "Sign up" : "Log in"}
        </div>
        <div className="flex flex-col gap-4">
          <InputBlue
            label="Username"
            type="text"
            value={loginInfo.username}
            onChange={(e) =>
              dispatchLoginInfo({ type: "username", value: e.target.value })
            }
          />
          <InputBlue
            label="Password"
            type="password"
            value={loginInfo.password}
            onChange={(e) =>
              dispatchLoginInfo({ type: "password", value: e.target.value })
            }
          />
          {!isSigningUp ? (
            <></>
          ) : (
            <>
              <InputBlue
                label="Confirm Password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <InputBlue
                label="Phone number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="flex flex-row gap-4 justify-start items-center">
          {!isSigningUp ? (
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
          ) : (
            <button
              className={`${
                !loading && error
                  ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
                  : ""
              }`}
              onClick={() => {
                if (!loading) {
                  if (signupPassword === loginInfo.password) {
                    setError(false);
                    handleSignup(
                      loginInfo,
                      phoneNumber,
                      setLoading,
                      setCookies,
                      setError
                    );
                  } else {
                    setError(true);
                    alert("Password does not match");
                  }
                }
              }}
            >
              {!loading ? (
                "Sign up"
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
          )}
          {isSigningUp ? (
            <></>
          ) : (
            <a className="italic" href="./login">
              Forgot Password?
            </a>
          )}
          <a
            className="italic cursor-pointer"
            onClick={() => setIsSigningUp(!isSigningUp)}
          >
            {isSigningUp ? "Log in." : "Sign up."}
          </a>
        </div>
      </div>
    </div>
  );
}
