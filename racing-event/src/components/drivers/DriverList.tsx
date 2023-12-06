import {useContext, useState} from 'react';
import DriverItem from './DriverItem';
import { DriverContext } from '../../contexts/DriverContext';
import { IDriverContext } from '../../interfaces/IDriverContext';

const DriverList = () => {
    
    const {drivers} = useContext(DriverContext) as IDriverContext;

    const [searchTerm, setSearchTerm] = useState("");

    const filteredDrivers = drivers.filter((driver) => driver.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const getDriversTSX = () => {
        const driversTSX = filteredDrivers.map( (_drivers, i) => (
            <DriverItem key={i} 
            id={_drivers.id}
            name={_drivers.name} 
            image={_drivers.image}
            age={_drivers.age} 
            nationality={_drivers.nationality}/> 
            ))
            return driversTSX;
        }
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    
    return (
        <section className='mt-5 mb-5'>
            <div className='d-flex flex-row justify-content-between'>  
                <div>
                    <h3>Deltagere</h3>
                    <p>Antall påmeldte: {drivers.length} </p>
                </div>
                <div className='d-flex flex-column '>
                    <span className='fs-5'>Søk etter deltager</span>
                    <input type="text" name='input' value={searchTerm} onChange={handleChange}/>
                </div>
            </div>    
            <section className='row g-3'>
                {getDriversTSX()}
            </section>
        </section>
    )
}

export default DriverList;