import React from "react";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />
            <main className="p-4">
                <h1 className="text-2xl font-bold">
                    Welcome to the Shopping App!
                </h1>
                <p className="mt-2">This is your simple starting page.</p>
            </main>
        </div>
    );
}

export default App;
