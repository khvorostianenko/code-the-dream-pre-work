import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout ({children}) {
    return (
        <>
            <Header />
            <main id="main">
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    )
}