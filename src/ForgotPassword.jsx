import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader"

function reset ()
{
    return(
        <div>
            <SimpleHeader />
            <div className="flex justify-center items-center h-screen bg-slate-900">
            <p className="text-xl text-white text-center">To reset password email at <b className="text-blue-500">reset@gigadevden.com</b></p>
        </div>
        <Footer />
        </div>
        
        
    );
}

export default reset;