import { faHome, faUser, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth-slice";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authenticated = useSelector((state) => state.auth.authenticated);

    const [userDropdownOpen, setDropdown] = useState(false);

    const handleNavigation = (navigateTo) => navigate(navigateTo);

    const handleUser = () => {
        setDropdown(!userDropdownOpen);
    };

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-secondary">
            <button
                className="rounded-xl p-4 text-xl bg-secondary text-primary hover:bg-primary hover:text-secondary"
                onClick={() => handleNavigation("/dashboard")}
            >
                <FontAwesomeIcon icon={faHome} />
            </button>
            <h1
                className="flex gap-2 items-center text-3xl tracking-widest cursor-pointer text-text"
                onClick={() => handleNavigation("/dashboard")}
            >
                <span>WindWise</span>
                <FontAwesomeIcon icon={faWind} />
            </h1>
            <button
                className="rounded-xl p-4 text-xl bg-secondary text-primary hover:bg-primary hover:text-secondary"
                onClick={handleUser}
                data-dropdown-toggle="dropdown"
            >
                <FontAwesomeIcon icon={faUser} />
                {userDropdownOpen && (
                    <div
                        id="dropdown"
                        className="absolute top-20 right-7 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            {authenticated ? (
                                <li
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => dispatch(logout())}
                                >
                                    Log Out
                                </li>
                            ) : (
                                <li
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </button>
        </header>
    );
}
