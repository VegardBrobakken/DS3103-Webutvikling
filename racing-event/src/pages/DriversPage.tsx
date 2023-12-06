import {useState} from 'react';
import EditDriver from "../components/drivers/EditDriver";
import DeleteDriver from "../components/drivers/DeleteDriver";
import DriverList from "../components/drivers/DriverList";
import { DriversProvider } from "../contexts/DriverContext";

type SelectedComponent = "edit" | "delete";

const DriversPage: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>("edit")

    const handleToggle = (component: SelectedComponent) => {
        setSelectedComponent(component)
    }

    return (
    <div className="container">
    <DriversProvider>
        <section className="edit-delete-box border rounded shadow mt-5 p-4">
            <div className='mb-3'>
                <button className='btn btn-success shadow me-3' onClick={() => handleToggle("edit")}>Rediger</button>
                <button className='btn btn-danger shadow' onClick={() => handleToggle("delete")}>Slett</button>
            </div>
            {selectedComponent === "edit" ? <EditDriver/> : <DeleteDriver/> }
        </section>
        <DriverList/>
    </DriversProvider>
    </div>
    );
}

export default DriversPage;