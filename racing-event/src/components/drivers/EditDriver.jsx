import {useContext, useState} from 'react'
import { DriverContext } from '../../contexts/DriverContext'

const EditDriver = () => {
    const {getById, editDriver} = useContext(DriverContext);

    const [id, setId] = useState("");
    const [driverToUpdate, setDriverToUpdate] = useState({name: "", age: "", nationality: ""});
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e) => {
        switch(e.currentTarget.name) {
            case "id": 
                setId(e.currentTarget.value);
            break;
            case "name": 
                setDriverToUpdate({...driverToUpdate, name: e.currentTarget.value});
            break;
            case "age": 
                setDriverToUpdate({...driverToUpdate, age: e.currentTarget.value});
            break; 
            case "nationality":
                setDriverToUpdate({...driverToUpdate, nationality: e.currentTarget.value});
        }
    }
    
    const getByIdFromContext = async () => {
        console.log(id);
        try {
            if (id === null) {
                setStatusMessage("Du må hente driver først")
            } else {
                const driverFromContext = await getById(id);
            if (driverFromContext === false) {
                setStatusMessage("Fant ikke driver")
                statusMessageTimer();
            } else {
                setDriverToUpdate(driverFromContext);    
            }
        }
        } catch (error) {
            console.log(error)
        }
    }

    const saveChanges = (name, age, nationality) => {
        if (!driverToUpdate.name || !driverToUpdate.age || !driverToUpdate.nationality) {
            
            setStatusMessage("Du må hente driver og fylle inn feltene")

        } else {
            editDriver(driverToUpdate);
            setStatusMessage("Endring lagret")             
            statusMessageTimer();
        }
    }

    const statusMessageTimer = () => {
        setTimeout(() => {
            setStatusMessage("");
        }, 5000) 
    }    

    return (
        <section>
            <h3>Rediger deltager</h3>
                <label>Angi id</label>
            <div>
                <input onChange={handleChange} name="id" value={id} type="text" />
                <input onClick={getByIdFromContext} type="button" value="Hent etter ID" />
            </div>
            <div className='form-content-box'>
                <label>Navn</label>
                <input className="input-field" onChange={handleChange} name="name" value={driverToUpdate.name} type="text" />
            </div>
            <div className='form-content-box'>
                <label>Alder</label>
                <input className="input-field" onChange={handleChange} name="age" value={driverToUpdate.age} type="text" />
            </div>
            <div className='form-content-box'>
                <label>Nasjonalitet</label>
                <input className="input-field" onChange={handleChange} name="nationality" value={driverToUpdate.nationality} type="text" />
            </div>
            <input className="mt-3" onClick={saveChanges} value="Lagre endring" type="button" />
            <span>{statusMessage}</span>
        </section>
    )
}

export default EditDriver;