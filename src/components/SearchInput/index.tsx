import React, { Fragment, useState, useMemo } from 'react';

import { Listbox, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, SelectorIcon } from '@heroicons/react/solid';

import countries from '../../utils/countries';

interface SearchInputProps {
  handleSearchUser: (value: string) => void;
  handleFilterByNacionality: (natio: string | null) => any;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  handleSearchUser,
  handleFilterByNacionality,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    'none'
  );

  const selectedCountry = useMemo(() => {
    return countries.find((country) => country.code === selectedCountryCode);
  }, [selectedCountryCode]);

  return (
    <div className="flex items-center justify-between py-1 px-4 space-x-20 bg-white my-6 rounded-md shadow-lg hover:shadow-xl transform hover:scale-101 transition duration-500">
      <div className="flex bg-gray-100 w-72 space-x-6 rounded-lg">
        <SearchIcon width={20} />
        <input
          onChange={(e) => handleSearchUser(e.target.value)}
          className="bg-gray-100 outline-none placeholder-gray-500"
          type="text"
          placeholder="Pesquise pelo nome"
        />
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 font-semibold text-blue-900 bg-blue-900 bg-opacity-0 rounded-md hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Filtrar
            <ChevronDownIcon
              className="w-5 h-5 ml-1 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -top-4 left-32 w-56 mt-3 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2 filterContent">
              <Menu.Item>
                {() => (
                  <Listbox
                    value={selectedCountry?.code}
                    onChange={(value) => {
                      handleFilterByNacionality(value || null);
                      setSelectedCountryCode(value || null);
                    }}
                  >
                    {({ open: openList }) => (
                      <>
                        <Listbox.Label className="block text-sm font-bold mb-2 text-gray-700">
                          Nacionalidade
                        </Listbox.Label>
                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm">
                            <div className="flex items-center">
                              <span>{selectedCountry?.emoji}</span>
                              <span className="ml-3 block truncate">
                                {selectedCountry?.name}
                              </span>
                            </div>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={openList}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {countries.map((country) => (
                                <Listbox.Option
                                  key={country.code}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-900'
                                    }
                                            'cursor-default select-none relative py-2 pl-3 pr-9'`
                                  }
                                  value={country.code}
                                >
                                  {({ selected }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span className="mr-2">
                                          {country.emoji}
                                        </span>
                                        <span
                                          className={`${
                                            selected
                                              ? 'font-semibold'
                                              : 'font-normal'
                                          }
                                                    'block truncate'
                                                  `}
                                        >
                                          {country.name}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
