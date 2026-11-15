import { useState, useEffect } from "react";

function App() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  

  useEffect(() => {
    async function getFilms(){
      try {
        const response = await fetch("https://ghibliapi.dev/films");

        if (!response.ok){

          throw new Error("Something went wrong");
  
        }



        const data = await response.json();

        setFilms(data);
        
      }catch(err){
        console.log(err);
        setError(true);
      }finally{
        setLoading(false);
      }
    }

    getFilms();
  }, [])

  function renderFilms(){
      const filteredFilms = films.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

      if (filteredFilms.length!==0){
        const displayedTitles = filteredFilms.map(item => {
          return <div  key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.director}</p>
              <p>{item.release_date}</p>
              <p>{item.description}</p>
            </div>
        
        });

        return displayedTitles;
      }else{
        const displayedTitles = "No films match the search"

        return displayedTitles;
      }
  }

  function handleSearch(e){
    const typed = e.target.value;
    setSearch(typed);
  }

  

  return (
    <div>
        
        {
          loading 
            ? "Loading..." 
            : error
              ? "The Request Failed"
              : renderFilms()
        }


        <input onChange={handleSearch}></input>
    </div>
  );
}

export default App;