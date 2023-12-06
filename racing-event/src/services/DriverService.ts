import axios from "axios";
import { IDriver } from "../interfaces/IDriver";

const DriverService = (()=>{

    const driverController = "http://localhost:5129/api/drivers";
    const imageUploadController = "http://localhost:5129/api/imageUpload"
    const imageUrl = "http://localhost:5129/images/drivers"


    const getAll = async () => {
        try {
            const result = await axios.get(driverController);
            if (result != null) {
                return result.data;
            } else {
                return {success: false, error: "Kunne ikke hente drivers"}
            }
        }
        catch (err) {
            console.log("Fikk ikke kontakt med driverController");
            return [];
        }
    }

    const getById = async (id: number) => {
        try {
            const result = await axios.get(`${driverController}/${id}`);
            if (result != null) {
                return result.data
            } else {
                return {success: false, error: "kunne ikke hente etter ID"}
            }
        } catch (err) {
            console.log("Kunne ikke hente objekt med id", err)
            return false;
        }
    }

    const getByName = async (name: string) => {
        try {
            const result = await axios.get(`${driverController}/${name}`);
            if (result != null) {
                return result.data
            } else {
                return {sucess: false, error: "Kunne ikke hente etter navn"}
            }
        } catch (err) {
            console.log("Kunne ikke hente objekt med navn", err)
        }
    }

    const putDriver = async (driverToUpdate: IDriver) => {
        try {
            const result = await axios.put(driverController, driverToUpdate); 
            if (result != null) {
                return {success: true}
            } else {
                return {success: false, error: "kunne ikke pute driver"}
            }
        } catch {
            console.log("Kunne ikke endre driver")
        }
    }

    const postDriver = async (newDriver : IDriver, image: string) => { 
        try {    
            const formData = new FormData();
            formData.append("formFile", image);
            
            const result = await axios.post(driverController, newDriver);
            
            const uploadImageResult = await axios({
                url: imageUploadController, 
                method: "POST",
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            });
            
            formData.delete("formFile")

            if (result.status === 200 && uploadImageResult.status === 200) {
                console.log("Vellykket opplasting av driver og bilde", result.status)
                return true;
            } else {
                console.log(result.status, uploadImageResult.status)
                return false;
            }

        } catch (error) {
            console.error("Error posting driver", error)
            return false;
        }
    }

    const deleteDriver = async (id: number) => {
        try {
            const result = await axios.delete(`${driverController}/${id}`);
            if (result != null) {
                console.log("Driver ble vellykket slettet")
                return true;
            } else {
                console.log("Fant ikke driver")
                return false;
            }
        } catch (error) {
            console.log("Feil ved sletting av driver", error)
            return false;
        }
    }

    const getImageUrl = () => {
        return imageUrl;
    }

    return {
        getAll,
        getById,
        getByName,
        postDriver,
        deleteDriver,
        putDriver,
        getImageUrl

    };

})();;

export default DriverService;