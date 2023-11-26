import { createRoot } from "react-dom/client";
import Header from "./components/header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import InspectionPage from "./pages/inspection-page";
import DashboardPage from "./pages/dashboard-page";
import LoginPage from "./pages/login-page";
import Loader from "./components/loader";
import AuthenticatedGuard from "./guards/authenticated-guard";
import UnauthenticatedGuard from "./guards/unauthenticated-guard";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="flex flex-col p-8 bg-background text-text h-[calc(100vh-84px)] overflow-auto">
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={
                            <UnauthenticatedGuard redirectTo="/dashboard">
                                <LoginPage />
                            </UnauthenticatedGuard>
                        }
                    />
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <AuthenticatedGuard redirectTo="/">
                                <DashboardPage />
                            </AuthenticatedGuard>
                        }
                    />
                    <Route
                        exact
                        path="/inspection"
                        element={
                            <AuthenticatedGuard redirectTo="/">
                                <InspectionPage />
                            </AuthenticatedGuard>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route
                        path="*"
                        element={<Navigate replace to="/login" />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
