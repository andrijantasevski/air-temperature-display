import Input from "./Input";
import { useEffect, useState, useRef } from "react";

export default function Combobox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function openDropdown() {
    setIsDropdownOpen(true);
  }

  useEffect(() => {
    function closeDropdown(event: MouseEvent) {}
  }, []);

  return (
    <div className="relative">
      <Input ref={inputRef} onClick={openDropdown} fullWidth id="locationInput" type="text" errorMessage="Location is required" placeholder="Celje">
        Location
      </Input>

      {isDropdownOpen && <div className="min-h-[150px] absolute bg-gray-800 rounded-lg mt-2 w-full border border-gray-300"></div>}
    </div>
  );
}
