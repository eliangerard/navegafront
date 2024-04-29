import { Map, Marker, ZoomControl } from 'pigeon-maps';
import pin from '/annIcon.svg'
import buildings from './data/buildings';
import getMapStyle from './helpers/getMapStyle';
import { Icon } from './ui/icons/Icon';
import { useState } from 'react';

export default function App() {

  const bounds = [
    [-106.11266759471128, 28.703281609042378],
    [-106.096553034047, 28.716028764094105]
  ];

  const [style, setStyle] = useState(0);

  const styles = [
    (x, y, z) => { return `https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/${z}/${x}/${y}.png` },
    (x, y, z) => { return `https://b.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png` },
    (x, y, z) => { return `https://b.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png` },
    (x, y, z) => { return `https://b.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png` },
    (x, y, z) => { return `https://tile.openstreetmap.org/${z}/${x}/${y}.png` },
    (x, y, z) => { return `https://tile.openstreetmap.fr/hot/${z}/${x}/${y}.png` },
  ];

  const [zoom, setZoom] = useState(17);

  console.log(zoom <= 17 ? (17 / zoom) : 1, zoom);

  return (
    <div className='w-full h-full'>
      <Map
        provider={styles[style]}
        defaultCenter={[28.7080764, -106.1064929]}
        defaultZoom={17}
        maxZoom={20}
        zoomSnap={false}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => { setZoom(zoom) }}
        

        // // initialViewState={{
        // //   longitude: -106.1064929,
        // //   latitude: 28.7080764,
        // //   zoom
        // // }}
        // // mapboxAccessToken='pk.eyJ1IjoiZWxpYW5nZXJhcmQiLCJhIjoiY2xzOXQwdDdpMGFhazJqbno3enljczNwMiJ9.lJq87bH88oRfFOXi6NbVQA'
        // minZoom={16}
        // maxZoom={20}
      // // mapStyle={getMapStyle()}
      // onClick={(e) => console.log(e.lngLat)}
      // maxBounds={bounds}
      // maxPitch={45}
      // asyncRender={true}
      zoom={zoom}
      // onZoom={({ viewState }) => setZoom(viewState.zoom)}
      >
        {/* <NavigationControl showCompass showZoom={false} />
        {/* <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source> 
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showAccuracyCircle={false}
        /> */}
        <ZoomControl />
        {
          buildings.map((building, i) => (
            <Marker
              key={i}
              // longitude={building.lng}
              // latitude={building.lat}
              anchor={[building.lat, building.lng]}
            >
              <Icon building={building} style={{ transform: `scale(${zoom <= 17 ? (1 * Math.pow((zoom / 17), 6)) : 1})` }} />
            </Marker>
          ))
        }
        <Marker
          draggable
          // longitude={-106.1064929}
          // latitude={28.7080764}
          anchor={[28.7080764, -106.1064929]}
        >
          <img src={pin} style={{ height: '2.5rem' }} />
        </Marker>
        <div className='absolute bottom-4 left-4 border-2 border-zinc-300 bg-white rounded-lg h-10 flex justify-around w-32 items-center'>
          <button onClick={() => setStyle((style - 1 + styles.length) % styles.length)} className='w-8'
          >{'<'}</button>
          <p className='w-8 text-center'>{style}</p>
          <button className='w-8'
            onClick={() => setStyle((style + 1) % styles.length)}
          >{'>'}</button>
        </div>
      </Map >
    </div>
  );
}