import {Link} from "react-router-dom"

export function InputBox({label, placeholder, OnChange}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input OnChange={OnChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-purple-500" />
    </div>
}