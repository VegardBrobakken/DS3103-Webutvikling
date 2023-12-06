import { ChangeEvent, useContext, useState } from "react";
import { DriverContext } from "../../contexts/DriverContext";
import { IDriverContext } from "../../interfaces/IDriverContext";

const DeleteDriver = () => {

    const {deleteDriver} = useContext(DriverContext) as IDriverContext;

    const [id, setId] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        if (inputValue === "") {
            setId(null);
        } else {
            const parsedValue = parseInt(inputValue);
            if (!isNaN(parsedValue)) {
                setId(parsedValue);
            }
        }
            
    }

    const handleClick = async () => {
        try { 
            if(id === null) {
                setStatusMessage("Du må skrive inn en id")
            } else {
                const success = await deleteDriver(id);  
                if (success === false) {
                    setStatusMessage("Deltager finnes ikke")
                } else {
                    setStatusMessage("Deltager slettet")
                }
            }
            setTimeout(() => {
                setStatusMessage("");
            }, 5000) 
        }
        catch (error) {
            console.error("Feil ved sletting av driver", error)
    
        }
    }


    return (
        <section>
            <h3>Slett deltager</h3>
            <div className="form-content-box">
                <label>Skriv inn id-en til deltageren du vil slette</label>
                <input className="input-field" onChange={handleChange} name="id" value={id === null ? "" : id.toString()} type="text" />
            </div>
            <input className="mt-3" onClick={handleClick} type="button" value={"Slett"} />
            <span>{statusMessage}</span>
        </section>
    );
};

export default DeleteDriver;