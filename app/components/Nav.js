import Link from "next/link";
import { Navbar, Button } from "flowbite-react";

/**
 * Navbar component
 *
 * @param {Object} props
 * @param {Boolean} props.home - Is current page home or not
 * @param {Function} props.handleClick - Click handler
 * @returns {ReactNode} - A react element that renders the Navigation bar
 */
export default function Nav({ home, handleClick }) {
    return (
        <Navbar fluid border rounded className="shadow-md p-4">
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Heat Transfer</span>
            </Navbar.Brand>
            <Button onClick={handleClick} disabled={!home} color="blue">
                + Create Simulation
            </Button>
        </Navbar>
    );
}
