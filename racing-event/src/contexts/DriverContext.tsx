import {FC, createContext, ReactNode, useState, useEffect} from 'react';
import DriverService from '../services/DriverService';
import { IDriverContext } from '../interfaces/IDriverContext';
import { IDriver } from '../interfaces/IDriver';

export const DriverContext = createContext<IDriverContext | null>(null);

interface Props {
    children: ReactNode;
}

export const DriversProvider : FC<Props> = ({children}) => {

    const [drivers, setDrivers] = useState<IDriver[]>([]);

    useEffect(() => {
        setTimeout(() => {
            getDriversFromService();
        }, 2000)
    }, [])

    const getDriversFromService = async () => {
        try {
            const driversFromService = await DriverService.getAll();
            setDrivers(driversFromService);
        } 
        catch (error) {
            console.log(error + "Kunne ikke hente drivers fra service")
        }
    }

    const getById = async (id: number) => {
        try {
            const driversToUpdate = await DriverService.getById(id)
            if (driversToUpdate != null) {
                return driversToUpdate
            } else {
                return {sucess: false, error: "Kunne ikke hente etter navn"}
            }
        } catch (error) {
            console.log(error + "Kunne ikke hente driver med id");
        }
    }

    const getByName = async (name: string) => {
        try {
            const result = await DriverService.getByName(name);
            if (result != null) {
                return result
            } else {
                return {sucess: false, error: "Kunne ikke hente etter navn"}
            }
        } catch (err) {
            console.log("Kunne ikke hente objekt med navn", err)
        }
    }

    const editDriver = async (driverToUpdate: IDriver) => {
        try {
            await DriverService.putDriver(driverToUpdate);
            getDriversFromService();
        } catch (error) {
            console.log(error + "Kunne ikke oppdatere driver")
        }
    }

    const postDriver = async (newDriver: IDriver, image: string) => {
        try {
            await DriverService.postDriver(newDriver, image);
            getDriversFromService()
            return true;
        } catch (error) {
            console.log(error + "Kunne ikke poste ny driver")
            return false;
        }
    }   

    const deleteDriver = async (id: number) => {
        try {
            const result = await DriverService.deleteDriver(id);
            if (result) {
                console.log(result);
                getDriversFromService();
                return true;
            } else {
                console.log(result);
                return false;
            }
        } catch (error) {
            console.log(error + "Kunne ikke slette driver");
            return false;
        }
    }

    return (
        <DriverContext.Provider value={{drivers, getById, getByName, editDriver, postDriver, deleteDriver}}>
            {children}
        </DriverContext.Provider>
    )
}