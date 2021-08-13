/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';

import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';

import { Modal, SearchInput } from '../components';
import { Table } from '../components/Table';
import { api } from '../services/api';
import { User } from '../types/User';

interface IMainProps {
  users: User[];
  results: number;
  page: number;
}

export default function Home({ users: usersApi, page }: IMainProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(usersApi);
  const [selectedUser, setSelectedUser] = useState<User>();

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const handleModal = (user?: User) => {
    setShowModal((prev) => !prev);
    if (user) setSelectedUser(user);
  };

  const handleSearchUser = (value: string) => {
    if (!value) setUsers(usersApi);
    const filtered = usersApi.filter((user) =>
      user.name.first.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleNextPage = async (): Promise<void> => {
    setIsLoadingMore(true);
    const response = await api.get(`&page=${page + 1}`);

    const newUsers = response.data.results.map((user: User) => {
      return {
        ...user,
        dob: {
          age: user.dob.age,
          date: new Date(user.dob.date).toLocaleString('pt-BR'),
        },
      };
    });
    setIsLoadingMore(false);
    setUsers([...users, ...newUsers]);
  };

  return (
    <div className="antialiased w-full text-gray-700">
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900">
          <header className="text-gray-600 body-font bg-white w-full">
            <div className="container mx-auto flex flex-wrap p-3 px-5 flex-col md:flex-row items-center">
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="ml-3 text-xl">Pharma Inc</span>
              </a>
              <button
                type="button"
                className="inline-flex ml-auto items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </header>
          <SearchInput handleSearchUser={handleSearchUser} />
          <div className="col-span-12  ">
            <div className="overflow-y-auto" style={{ maxHeight: '72vh' }}>
              <Table users={users} handleModal={handleModal} />

              {users.length > 0 ? (
                <button
                  className="btn flex items-center justify-center text-white w-full"
                  type="button"
                  onClick={() => handleNextPage()}
                >
                  {isLoadingMore ? (
                    <>
                      <RefreshIcon className="text-gray-200" width={18} />
                      <span className="ml-1 text-gray-200">Loading</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="text-gray-200" width={18} />
                      <span className="ml-1 text-gray-200">Load more</span>
                    </>
                  )}
                </button>
              ) : (
                <p className="text-center text-white">
                  Nenhum usuário encontrado
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        user={selectedUser}
        showModal={showModal}
        setShowModal={handleModal}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { page } = props.query;
  const response = await api.get(`&page=${page || 1}`);

  const data: IMainProps = {
    users: response.data.results.map((user: User) => {
      return {
        ...user,
        gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
        dob: {
          age: user.dob.age,
          date: new Date(user.dob.date).toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
          }),
        },
      };
    }),
    results: response.data.info.results,
    page: response.data.info.page,
  };

  return {
    props: data,
  };
};
