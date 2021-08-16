import React, { Fragment, useState } from 'react';

import { Menu, RadioGroup, Transition } from '@headlessui/react';
import { EyeIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid';

import { User } from '../types/User';

interface ITableProps {
  users: User[];
  handleModal: (user?: User) => void;
  handleSelectGender: (gender: string | null | undefined) => any;
}

export const Table: React.FC<ITableProps> = ({
  users,
  handleModal,
  handleSelectGender,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>();

  return (
    <table className="table text-gray-400 border-separate text-sm mr-2 mt-6">
      <thead className="bg-gray-800 text-gray-500">
        <tr>
          <th className="p-3 text-white w-96">Nome</th>
          <th className="p-3 text-white w-28">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-blue-900 bg-opacity-0 rounded-md hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Gênero
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
                <Menu.Items className="absolute bottom-12 -left-20 mt-4 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {() => (
                      <RadioGroup
                        className="flex space-x-2 p-1 tooptipGender"
                        value={selectedGender}
                        onChange={(value) => {
                          if (value === selectedGender) {
                            handleSelectGender(null);
                            setSelectedGender(null);
                          } else {
                            handleSelectGender(value);
                            setSelectedGender(value);
                          }
                        }}
                      >
                        <RadioGroup.Option
                          key="male"
                          value="male"
                          className="relative rounded-lg shadow-lg px-5 py-1 cursor-pointer flex focus:outline-none"
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`text-gray-900 ${
                                        checked ? 'font-bold' : 'font-medium'
                                      }`}
                                    >
                                      Masculino
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="flex-shrink-0 text-black ml-2">
                                    <CheckIcon className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                        <RadioGroup.Option
                          key="female"
                          value="female"
                          className="relative rounded-lg shadow-lg px-5 py-1 cursor-pointer flex focus:outline-none"
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`text-gray-900  ${
                                        checked ? 'font-bold' : 'font-medium'
                                      }`}
                                    >
                                      Feminino
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="flex-shrink-0 text-black ml-2">
                                    <CheckIcon className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      </RadioGroup>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </th>
          <th className="p-3 text-white w-32">Data de Nascimento</th>
          <th className="p-3 text-white w-20">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id.value || index} className="bg-gray-800">
            <td className="p-3">
              <div className="flex align-items-center">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src={user.picture.medium}
                  alt="unsplash"
                />
                <div className="ml-3">
                  <div className="font-bold">{`${user.name.first} ${user.name.last}`}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
              </div>
            </td>
            <td className="p-3 text-center">{user.gender}</td>
            <td className="p-3 text-center">{user.dob.date}</td>
            <td className="p-3 text-center">
              <button
                type="button"
                className="btn"
                onClick={() => handleModal(user)}
              >
                <EyeIcon width={20} color="#fff" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
