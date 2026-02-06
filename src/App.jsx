// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./app/router"
import { seedUsers } from "./database/seed"

function App() {

    useEffect(() => {
        seedUsers()
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default App