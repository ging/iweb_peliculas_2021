export const postAPI = async (peliculas) => {
    try {
        const res = await fetch("https://myjson.dit.upm.es/api/bins", {
          method: 'POST', 
          headers:{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(peliculas)
        });
        const {uri} = await res.json();
        return uri;               
    } catch (err) {
        alert("No se ha podido crear el endpoint.")
    }
}

export const getAPI = async () => {
    try {
        const res = await fetch(localStorage.URL);
        return res.json();
    } catch (e) {
        alert("No se ha podido recuperar la información.")
    }
}

export const updateAPI = async (peliculas) => {
    try {
        await fetch(localStorage.URL, {
            method: 'PUT', 
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(peliculas)
        });
    } catch(e) {
        alert("Ha ocurrido un error");
        return;
    }
}