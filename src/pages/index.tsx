/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';

import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';

import { LogoSVG } from '../assets/Logo';
import { Modal, SearchInput } from '../components';
import { Table } from '../components/Table';
import { api, getParams } from '../services/api';
import { User } from '../types/User';
import { formatUserData } from '../utils/formatResponseApiData';

interface IMainProps {
  users: User[];
  results: number;
}

export default function Home({ users: usersApi }: IMainProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(usersApi);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedGender, setSelectedGender] = useState<string | null>();
  const [selectedNatio, setSelectedNatio] = useState<string | null>();
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const page = useRouter().query.page as string;

  useEffect(() => {
    if (selectedNatio || selectedGender) {
      const urlParams = getParams(Number(page) || 1, {
        gender: selectedGender,
        natio: selectedNatio,
      });

      api.get(urlParams).then((response) => {
        const filteredUsers = formatUserData(response.data);
        setUsers(filteredUsers);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNatio, selectedGender]);

  const handleModal = (user?: User): void => {
    setShowModal((prev) => !prev);
    if (user) setSelectedUser(user);
  };

  const handleSearchUser = (value: string): void => {
    if (!value) setUsers(usersApi);
    const filtered = usersApi.filter((user) =>
      user.name.first.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleNextPage = async (): Promise<void> => {
    setIsLoadingMore(true);
    const newPage = page ? Number(page) + 1 : 2;

    // Change URL Param
    router.push(`/?page=${newPage}`, undefined, {
      shallow: true,
    });

    const urlParams = getParams(newPage, {
      gender: selectedGender,
      natio: selectedNatio,
    });

    const response = await api.get(urlParams);
    const newUsers = formatUserData(response.data);
    setIsLoadingMore(false);
    setUsers([...users, ...newUsers]);
  };

  return (
    <div className="antialiased w-full text-gray-700">
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900">
          <header className="text-gray-600 body-font bg-white w-full">
            <div className="container mx-auto flex flex-wrap p-3 px-5 flex-col md:flex-row items-center">
              <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 no-underline">
                <LogoSVG />
                <span className="ml-3 text-xl">Pharma Inc</span>
              </div>
              <button
                type="button"
                className="inline-flex ml-auto items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Button
              </button>
            </div>
          </header>
          <SearchInput
            handleFilterByNacionality={setSelectedNatio}
            handleSearchUser={handleSearchUser}
          />
          <div className="col-span-12  ">
            <div className="overflow-y-auto" style={{ maxHeight: '72vh' }}>
              <Table
                users={users}
                handleModal={handleModal}
                handleSelectGender={setSelectedGender}
              />

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

  const urlParams = getParams(Number(page) || 1);
  const response = await api.get(urlParams);

  const data: IMainProps = {
    users: formatUserData(response.data),
    results: response.data.info.results,
  };

  return {
    props: data,
  };
};
