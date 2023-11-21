import { createRoot } from "react-dom/client";
import Header from "./components/header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import InspectionPage from "./pages/inspection";
import Dashboard from "./pages/dashboard";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/login";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main className="flex flex-col p-8 bg-background h-[calc(100vh-88px)] overflow-auto">
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/login" />}
                        />
                        <Route
                            path="*"
                            element={<Navigate replace to="/login" />}
                        />
                        <Route
                            exact
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            exact
                            path="/inspection"
                            element={<InspectionPage />}
                        />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
