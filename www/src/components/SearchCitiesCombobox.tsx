import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { IconCheck, IconChevronDown, IconLocation } from "@tabler/icons-react";

interface City {
  id: number;
  label: string;
  value: string;
}

const cities = [
  { id: 1, label: "Скопје", value: "skopje" },
  { id: 2, label: "Битола", value: "bitola" },
  { id: 3, label: "Куманово", value: "kumanovo" },
  { id: 4, label: "Охрид", value: "ohrid" },
  { id: 5, label: "Прилеп", value: "prilep" },
  { id: 6, label: "Тетово", value: "tetovo" },
  { id: 7, label: "Струга", value: "struga" },
  { id: 8, label: "Кавадарци", value: "kavadarci" },
];

const SearchCitiesComboBox = () => {
  const [selectedCity, setSelectedCity] = useState({} as City);
  const [cityQuery, setCityQuery] = useState("");

  const filteredCities = cityQuery === "" ? cities : cities.filter((city) => city.value.toLowerCase().includes(cityQuery.toLowerCase()) || city.label.toLowerCase().includes(cityQuery.toLowerCase()));

  return (
    <Combobox value={selectedCity} onChange={setSelectedCity} as="div" className="relative w-full">
      <div className="flex justify-between rounded-lg bg-transparent border border-gray-300 py-1 px-3 shadow-md">
        <div className="flex w-full items-center gap-1">
          <IconLocation className="h-5 w-5 text-primary-600" />
          <Combobox.Input displayValue={(city: City) => city.label} placeholder="Внесете град" className="w-full bg-transparent border-transparent font-normal focus:ring-0 border-0 focus:outline-none p-1" onChange={(e) => setCityQuery(e.target.value)} />
        </div>

        <Combobox.Button title="Погледете ги градовите" aria-label="Погледнете ги градовите">
          <span className="sr-only">Погледете ги градовите</span>
          <IconChevronDown className="h-5 w-5 text-primary-600" />
        </Combobox.Button>
      </div>
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setCityQuery("")}>
        <Combobox.Options as="div" className="absolute mt-2 max-h-56 w-full overflow-y-auto rounded-lg bg-gray-50 py-2 shadow-md">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <Combobox.Option className={({ active }) => `flex cursor-pointer list-none items-center gap-2 px-4 py-2 hover:bg-primary-600 hover:text-primary-50 ${active ? "bg-primary-600 text-primary-50" : "text-gray-900"}`} key={city.id} value={city}>
                {({ selected, active }) => (
                  <>
                    <IconCheck className={`${selected ? "text-primary-600" : "text-transparent"} ${active ? "text-primary-50" : ""} h-4 w-4`} />

                    {city.label}
                  </>
                )}
              </Combobox.Option>
            ))
          ) : (
            <p className="px-4 py-2">Нема резултати.</p>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default SearchCitiesComboBox;
