import { ThemeModeScript } from "flowbite-react";

import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "Solar water heater!",
    description: "A simulation for a solar water heater."
};

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
