import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const prefijo = 'https://cataas.com'
    const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
    const [hecho, setHecho] = useState();
    const [imagen, setImagen] = useState();
    const [cambiar, setCambiar] = useState(false);
    
    /* Para recuperar la cita al cargar la pagina */
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then((res) => res.json())
        .then(data => {
            const { fact } = data; /* Data devuelve todo el objeto y solo accedemos al Fact porque es elo que nos piden */
            setHecho(fact);
        })
    }, [cambiar]);
    
    /* Para recuperar la imagen cada vez que tenemos una cita nueva */
    useEffect(() => {
        if(!hecho) return
        const primeraPalabra = hecho.split(' ', 1)[0]; // Obtenemos la primera palabra Split nos devuelve un array y tomamos la primera palabra con [0]
        fetch(`https://cataas.com/cat/says/${primeraPalabra}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(res => {
            const {url} = res
            setImagen(url)
        }) 
    },[hecho])

    return (
        <main >
            <h1>App de Gatitos</h1>
            {hecho && <p className='texto'>{hecho}</p>}
            {imagen && <img src={`${prefijo}${imagen}`} alt={`Imagen extraida usando la primera palabra de ${hecho}`} />}
            <button onClick={() => setCambiar(!cambiar)}>Cambiar</button>
        </main>
    );
}

export { App };