import { IDriver } from "./IDriver";

export interface IDriverContext {
    drivers: IDriver[];
    getById: (id: number) => void;
    getByName: (name: string) => void;
    editDriver: (driverToUpdate:  IDriver) => void;
    postDriver: (newDriver: IDriver, image: string) =>void;
    deleteDriver: (id: number) => Promise<boolean>;
}