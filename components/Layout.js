import CustomHead from "./CustomHead"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children, title, description}) => {
    return (
        <div className="flex flex-col">
            <CustomHead title={title} description={description} />
            <Header/>
                <main>
                    {children}
                </main>
            <Footer />
        </div>
    )
}

export default Layout
