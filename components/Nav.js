import Link from "next/link";
import NavItem from "./NavItem";
import {
    HomeIcon,
    PhoneIcon,
    LoginIcon,
    AcademicCapIcon,
} from "@heroicons/react/outline";


function Nav() {
    return (
        <nav className="flex flex-col sm:flex-row justify-around items-center font-light border-b">
            <Link href="/">
                <div className="hover:text-mediumblue flex flex-col sm:flex-row sm:px-12 cursor-pointer transform space-x-6">
                    <h1 className="text-3xl font-normal text-color2 text-center lg:text-left m-4 sm:m-0" > <a>Rorschach</a> </h1>
                </div>
            </Link>
            
            <div className="flex flex-grow text-color2 justify-evenly max-w-2xl px-3 pt-5 pb-2 space-x-16 sm:space-x-0">
                <Link href="/">
                    <a><NavItem title="Accueil" Icon={HomeIcon}/></a>
                </Link>

                <Link href="/contact">
                    <a><NavItem title="Contact" Icon={PhoneIcon} /></a>
                </Link>

                <Link href="/compte">
                    <a><NavItem title="Compte" Icon={LoginIcon} /></a>
                </Link>

                <Link href="/rorschachtest">
                    <a><NavItem title="Commencer un test" Icon={AcademicCapIcon} /></a>
                </Link>

            </div>
            
        </nav>
    )
}

export default Nav
