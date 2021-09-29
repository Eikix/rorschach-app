const Footer = () => {
    return (
        <footer className="max-w-full">
            <hr />
            <ul className="flex text-xs md:text-base justify-around my-6 mx-3">
                <li>
                    Conception par{' '}
                    <a
                        className="hover:text-color6"
                        href="https://www.linkedin.com/in/florence-damien-a47ba116b/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Florence Damien
                    </a>
                </li>
                <li>
                    Développement par{' '}
                    <a
                        className="hover:text-color6"
                        href="https://www.linkedin.com/in/elias-tazartes-a13450155/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Elias Tazartes
                    </a>
                </li>
                <li>Copyright, créée en 2021.</li>
            </ul>
        </footer>
    );
};

export default Footer;
