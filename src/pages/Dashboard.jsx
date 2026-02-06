import Navbar from "../components/Navbar"

export default function Dashboard() {

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-5xl mx-auto w-full text-center text-4xl font-bold">
                    Dashboard Page
                </div>
            </div>

        </div>
    )

}