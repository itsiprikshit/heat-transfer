import { ThemeModeScript } from "flowbite-react";

import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "Heat transfer!",
    description: "A simulation for a solar water heater."
};

/**
 * Root react component
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Child react elements
 * @returns {ReactNode} - A react element that renders html
 */
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <ThemeModeScript />
            </head>
            <body className={lato.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
