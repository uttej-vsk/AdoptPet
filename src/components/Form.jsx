import React from "react";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import AdoptedPetContext from "../context/AdoptedPetContext";
import { useContext } from "react";

function Form(props) {
  const [adoptedPet] = useContext(AdoptedPetContext);
  console.log(adoptedPet);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          animal: formData.get("animal") ?? "",
          breed: formData.get("breed") ?? "",
          location: formData.get("location") ?? "",
        };
        props.onReqParams(obj);
      }}
    >
      {adoptedPet ? (
        <div className="pet image-container">
          <img src={adoptedPet.images[0]} alt="" />
        </div>
      ) : null}

      <label htmlFor="location">
        Location
        <input name="location" id="location" placeholder="location" />
      </label>

      <label htmlFor="animal">
        Animal
        <select
          name="animal"
          id="animal"
          value={props.animal}
          onChange={(e) => {
            props.onSetAnimal(e.target.value);
          }}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal}>{animal}</option>
          ))}
        </select>
      </label>

      <label htmlFor="breed">
        Breed
        <select name="breed" id="breed" disabled={props.breeds.length === 0}>
          <option />
          {props.breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      </label>

      <button>Submit</button>
    </form>
  );
}

export default Form;
