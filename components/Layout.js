import CustomHead from "./CustomHead"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children, title, description}) => {
    return (
        <div>
            <CustomHead title={title} description={description} />
            <Header/>
                <main className="px-3 sm:px-4 md:px-5">
                    {children}
                </main>
            <Footer />
        </div>
    )
}

export default Layout
