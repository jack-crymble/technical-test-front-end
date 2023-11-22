import { useState } from "react";
import Button from "../components/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Add your login logic here
        console.log(`Logging in with email: ${email}, password: ${password}`);
    };

    return (
        <div className="flex h-full items-center justify-center bg-background">
            <div className="p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-text">
                    Log In
                </h2>
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-text"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-primary"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-text"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-primary"
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
