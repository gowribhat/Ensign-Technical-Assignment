export default function Navbar() {
    return (
        <nav className="bg-primary text-text-primary p-4 flex justify-between items-center shadow-md">
            <div className="font-heading text-2xl">DarkCart</div>
            <div>
                <button className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-lg transition">
                    Cart
                </button>
            </div>
        </nav>
    );
}
