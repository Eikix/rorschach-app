import Layout from '../components/Layout';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <Layout
                title="Accueil"
                description="Bienvenue au test de Rorschach en ligne. Ce site a été pensé et fait pour des thérapeutes professionnels."
            >
                <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 lg:h-screen">
                    <div className="flex flex-col justify-center items-center font-light text-center rounded-lg shadow-sm p-2 sm:p-4 md:p-8 xl:p-12 m-2 sm:m-4 md:m-16 lg:m-48">
                        <h1 className="text-2xl lg:text-3xl text-center">
                            Bienvenue au test de Rorschach en ligne.
                        </h1>
                        <Link href="/rorschachtest">
                            <a className="text-xl lg:text-2xl p-3 lg:p-6 border rounded-full mt-12 bg-gray-50 hover:bg-gray-100">
                                Commencer un test
                            </a>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
