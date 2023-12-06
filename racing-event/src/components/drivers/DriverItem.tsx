import {FC} from 'react'
import { IDriver } from "../../interfaces/IDriver";
import DriverService from '../../services/DriverService';

const DriverItem : FC<IDriver> = ({id, name, age, nationality, image}) => {
    return (
        <article className='col-12 col-md-6 col-lg-4'>
            <div className='border rounded shadow p-3 h-100 d-flex flex-column justify-content-between bg-dark text-white'>
                <h3 className='text-center'>{name} ({id})</h3>
                <div className='image-container'>
                    <img className='img-fluid' src={`${DriverService.getImageUrl()}/${image}`} alt={`Foto. Image of driver: ${name}`}></img>
                </div>
                <p><span className='fw-bold'>Alder:</span> {age}</p>
                <p><span className='fw-bold'>Nasjonalitet:</span> {nationality}</p>
            </div>
        </article>
    )
}

export default DriverItem;