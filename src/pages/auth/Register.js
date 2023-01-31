import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onEmailChanged = (e) => {
    setEmail(e.target.value);

    // form field validation
    if (e.target.value) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!mailformat.test(e.target.value)) {
        setEmailErr("The Email field is not a valid e-mail address.");
      } else {
        setEmailErr("");
      }
    } else {
      setEmailErr("The Email field is required.");
    }
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordErr("");
      if (e.target.value === confirmPassword) {
        setConfirmPasswordErr("");
      } else {
        setConfirmPasswordErr(
          "The password and confirmation password do not match."
        );
      }
    } else {
      setPasswordErr("The Password field is required.");
    }
  };

  const onConfirmPasswordChanged = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) setConfirmPasswordErr("");
    else
      setConfirmPasswordErr(
        "The password and confirmation password do not match."
      );
  };

  const onSignInClicked = () => {
    if (!email) {
      setEmailErr("The Email field is required.");
      return;
    }

    if (!password) {
      setPasswordErr("The Password field is required.");
      return;
    }

    const user = {
      email,
      user_id: 1,
    };
    dispatch(
      login({
        isAuthenticated: true,
        user,
      })
    );
    window.sessionStorage.setItem("isAuthenticated", "done");
    window.sessionStorage.setItem("user", JSON.stringify(user));
    navigate(from, { replace: true });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Coin Tax Report
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
            <h1 className="text-lg text-center font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-4" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={onEmailChanged}
                />
                {emailErr && (
                  <p class="mt-1 text-xs text-red-600 dark:text-red-500">
                    {emailErr}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={onPasswordChanged}
                />
                {passwordErr && (
                  <p class="mt-1 text-xs text-red-600 dark:text-red-500">
                    {passwordErr}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChanged}
                />
                {confirmPasswordErr && (
                  <p class="mt-1 text-xs text-red-600 dark:text-red-500">
                    {confirmPasswordErr}
                  </p>
                )}
              </div>
              <div style={{ marginTop: 25 }}>
                {emailErr || passwordErr || confirmPasswordErr ? (
                  <button
                    type="button"
                    class="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onSignInClicked}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
