/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';

import { Modal, SearchInput, Table } from '../components';
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
  const [searchedUsers, setSearchedUsers] = useState<User[] | null>();
  const [selectedGender, setSelectedGender] = useState<string | null>();
  const [selectedNatio, setSelectedNatio] = useState<string | null>();
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const page = useRouter().query.page as string;

  useEffect(() => {
    if (selectedGender || selectedNatio) {
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
    if (!value) setSearchedUsers(null);
    const filtered = users.filter((user) =>
      user.name.first.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedUsers(filtered);
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
                <img src="/logo.png" alt="Logo" width="40px" />
                <span className="ml-3 text-xl">Pharma Inc</span>
              </div>
            </div>
          </header>
          <SearchInput
            handleFilterByNacionality={setSelectedNatio}
            handleSearchUser={handleSearchUser}
          />
          <div className="col-span-12  ">
            <div className="overflow-y-auto" style={{ maxHeight: '72vh' }}>
              <Table
                users={searchedUsers || users}
                isLoadingMore={isLoadingMore}
                handleNextPage={handleNextPage}
                handleModal={handleModal}
                handleFilterByGender={setSelectedGender}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <Modal
          user={selectedUser}
          showModal={showModal}
          handleModal={handleModal}
        />
      )}
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
