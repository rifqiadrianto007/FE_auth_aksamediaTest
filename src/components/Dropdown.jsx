import { useState, useRef, useEffect } from "react"

export default function Dropdown({ trigger, children }) {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {

        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }

    }, [])

    return (
        <div ref={ref} className="relative">

            <div onClick={() => setOpen(!open)}>
                {trigger}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800
                border dark:border-gray-700 rounded shadow">
                    {children}
                </div>
            )}

        </div>
    )
}