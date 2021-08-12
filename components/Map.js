import { useState } from 'react';
import  ReactMapGL from 'react-map-gl';
import  Marker from 'react-map-gl';
import  Popup from 'react-map-gl';
import { getCenter } from 'geolib';


function Map({searchResults}) {

    const[selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map((results) => ({
        longitude: results.long,
        latitude: results.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setviewport] = useState({
        width: '100%',
        height: '100%',
        latitude:center.latitude,
        longitude:center.longitude,
        zoom:11
    })

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/rokitdog/cks8pynpz3arw17p4ye5o76qe'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport)=> setviewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                    <p onClick={()=> setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce' aria-label='push-pin'>📌</p>
                    </Marker>

                    
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}


        </ReactMapGL>
    )
}

export default Map
