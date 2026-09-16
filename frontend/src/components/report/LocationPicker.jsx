import toast from "react-hot-toast";
export default function LocationPicker({ latitude, longitude, location, onChange }) {
  const locate=()=>navigator.geolocation?.getCurrentPosition(pos=>onChange({latitude:pos.coords.latitude,longitude:pos.coords.longitude,location:location||`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`}),()=>toast.error("Location permission was denied"));
  return <div><div className="flex gap-2"><input required value={location} onChange={e=>onChange({location:e.target.value})} placeholder="Location" className="flex-1 border rounded-lg p-3"/><button type="button" onClick={locate} className="px-4 rounded-lg border">📍 Use GPS</button></div>{latitude&&longitude&&<p className="text-xs text-green-700 mt-2">Coordinates: {latitude.toFixed(5)}, {longitude.toFixed(5)}</p>}</div>;
}
