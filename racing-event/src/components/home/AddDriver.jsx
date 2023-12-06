import { useState, useContext } from "react";
import DriverService from "../../services/DriverService";
import { DriverContext } from "../../contexts/DriverContext";

const AddDriver = () => {

  const {postDriver} = useContext(DriverContext); 

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [ageErrorMessage, setAgeErrorMessage] = useState("");

  const handleChange = (e) => {
    const name = e.currentTarget.name

    switch ( name ) {
      case "name":
        setName(e.currentTarget.value) 
      break;
      case "age":
        if (!isNaN(e.currentTarget.value)) {
          setAge(parseInt(e.currentTarget.value));
          setAgeErrorMessage("");
        } else {
          setAgeErrorMessage("Alder må være et gyldig tall.");
        }
      break;
      case "nationality":
        setNationality(e.currentTarget.value) 
      break;
      case "image":
        setImage(e.currentTarget.files[0])
      break;
    }
  }

  const saveDriver = () => {
    if (name != null && !isNaN(age) && age != null && nationality != null && image != null) {

    const newDriver = {
        name: name,
        age: age, 
        nationality: nationality,
        image: image.name
      }
      postDriver(newDriver, image);
      setStatusMessage("Ny påmelding registrert")
      if (isNaN(age) || age == 0) {
        setStatusMessage("Feil input")
      }
    } else {
      setStatusMessage("Du må legge til all nødvendig informasjon!")
    }
    setTimeout(() => {
      setStatusMessage("");
    }, 5000) 
    return;
}

  return (
    <section id="add-driver-section" className="rounded shadow p-5 m-auto mb-5 background">
      <h3 className="text-center form-header">Påmeldingsskjema</h3>
        <div className="form-container">
          <div className="form-content-box">
            <label>Navn</label>
            <input name="name" onChange={handleChange} type="text" />
          </div>
          <div className="form-content-box">
            <label>Alder</label>
            <input name="age" onChange={handleChange} type="text" />
            <span className="error-message">{ageErrorMessage}</span>
          </div>
          <div className="form-content-box">
            <label>Nasjonalitet</label>
            <input name="nationality" onChange={handleChange} type="text" />
          </div>
          <div className="form-content-box">
            <label>Bilde</label>
            <input name="image" onChange={handleChange} type="file" />
          </div>
          <div>
            <button onClick={saveDriver} className="btn border btn-success shadow mt-3">
              Bekreft
            </button>
          </div>
        <span>{statusMessage}</span>
        </div>
    </section>
  );
};

export default AddDriver;
