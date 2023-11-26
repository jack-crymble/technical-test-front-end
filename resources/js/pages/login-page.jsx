import { useState } from "react";
import Button from "../components/button";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth-slice";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(
            login({
                user: username,
            })
        );
    };

    return (
        <div className="flex h-full items-center justify-center bg-background">
            <div className="w-96">
                <h2 className="text-2xl font-semibold mb-6 text-text">
                    Log In
                </h2>
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="text-sm font-medium"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 p-2 w-full border rounded-md text-black"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md text-black"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <Button onClick={handleLogin}>Log In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
