import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useBreedList from "../hooks/useBreedList.js";
import fetchSearch from "../queries/fetchSearch.js";
import Results from "./Results";
import Form from "./Form";

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds, status] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <Form
            animal={animal}
            breeds={breeds}
            onSetAnimal={setAnimal}
            onReqParams={setRequestParams}
          />
          <Results pets={pets} />
        </>
      )}
    </div>
  );
};

export default SearchParams;
