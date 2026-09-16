import { useRef } from "react";
import toast from "react-hot-toast";

export default function ImageUpload({ value, onChange }) {
  const ref = useRef(null);
  const handle = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) return toast.error("Use a JPEG, PNG, WebP or GIF image");
    if (file.size > 3 * 1024 * 1024) return toast.error("Image must be 3 MB or smaller");
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };
  return <div className="border-2 border-dashed rounded-xl p-4"><input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden"/><button type="button" onClick={()=>ref.current?.click()} className="px-4 py-2 border rounded-lg">📷 {value ? "Change evidence image" : "Add evidence image"}</button>{value&&<img src={value} alt="Evidence preview" className="mt-4 max-h-56 rounded-lg object-cover"/>}</div>;
}
