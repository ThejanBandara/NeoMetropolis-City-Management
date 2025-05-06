'use client'
// LoginForm.tsx
import React, { useState } from "react";
import { officers } from "@/types/Officer";
import { useAuth } from "@/lib/context/AuthContext";
import { GlobeIcon } from "lucide-react";
import { redirect } from "next/navigation";

const LoginForm: React.FC = () => {

    const [selectedID, setSelectedID] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { user, login, logout } = useAuth();

    const handleLogin = () => {
        const officer = officers.find((o) => o.id === selectedID);
        if (!officer) return setError("Officer not found.");
        if (officer.password !== password) return setError("Incorrect password.");

        login(officer);
        setError(null);
        redirect("/");
    };


    if (user) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl">Welcome, {user.name}</h2>
                <span className="loading loading-spinner text-info mt-4"></span>
                <p className="text-sm text-gray-500">loading</p>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 items-center mb-12">
                <GlobeIcon className="size-12" />
                <h1 className="font-bold text-4xl">NeoMetroPolis</h1>
            </div>
            <div className="w-3/12 h-fit border-[1px] border-accent-content/60 p-3 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select Officer</legend>
                    <select className="select" value={selectedID} onChange={(e) => setSelectedID(e.target.value)}>
                        <option value="">Select Officer</option>
                        {officers.map((officer) => (
                            <option key={officer.id} value={officer.id}>
                                {officer.name} ({officer.role})
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input
                        className="input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                {error && <p className="text-error w-full text-center">{error}</p>}
                <button className="btn btn-soft btn-info w-full mt-2 " onClick={handleLogin}>Login</button>
            </div>
            <p className="text-sm mt-4 text-gray-400">type the officer's name in lowercase as the password</p>
        </div>
    );
};

export default LoginForm;
