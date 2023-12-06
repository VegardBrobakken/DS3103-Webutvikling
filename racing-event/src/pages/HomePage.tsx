import AddDriver from "../components/home/AddDriver";
import MainContent from "../components/home/MainContent";
import { DriversProvider } from "../contexts/DriverContext";

const HomePage = () => {

    return (
    <section className="container">
        <MainContent/>
        <DriversProvider>
            <AddDriver/>
        </DriversProvider>
    </section>
    );
}

export default HomePage; 