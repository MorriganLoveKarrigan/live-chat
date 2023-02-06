import './App.scss';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/router/AppRouter";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./utils/auth";
import Loader from "./components/loader/Loader";

function App() {
    const [user,loading,error] = useAuthState(auth)

   if (loading) {
       return <Loader/>
   }

   else {
       return (
           <BrowserRouter>
               <Navbar/>
               <AppRouter/>
           </BrowserRouter>
       );
   }

}

export default App;
