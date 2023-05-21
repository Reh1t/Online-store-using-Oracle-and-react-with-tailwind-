import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader"

function ErrorPage ()
{
    return(
        <div>
            <SimpleHeader />
            <div className="flex justify-center items-center h-screen bg-slate-900">
            <p className="text-xl text-white text-center">Login to Access this page <b className="text-red-500">Inaccessible</b></p>
        </div>
        <Footer />
        </div>
        
        
    );
}

export default ErrorPage;