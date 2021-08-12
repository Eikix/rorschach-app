import Layout from "../components/Layout";
import Link from "next/link";

const Compte = () => {
  return (
    <Layout title="Compte" description="Bienvenue au test de Rorschach en ligne. Ce site a été pensé et fait pour des thérapeutes professionnels.">
      <div className="flex flex-col justify-center items-center font-light text-center rounded-lg  shadow-sm p-6 md:p-8 xl:p-12 m-12 md:m-16 lg:m-48">
        <h1 className="text-2xl lg:text-3xl text-center">Bienvenue au test de Rorschach en ligne. La page de connexion à un compte est en cours de réalisation. </h1>
        <Link href="/rorschachtest">
          <a className="text-xl lg:text-2xl p-3 lg:p-6 border rounded-full mt-12 bg-gray-100 hover:bg-beige">Commencer un test</a>
        </Link>
      </div>
      
    </Layout>
  )
}

export default Compte
