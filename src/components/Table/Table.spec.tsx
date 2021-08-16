import { fireEvent, render, screen } from '@testing-library/react';

import { Table } from '.';

const handleModal = jest.fn();
const handleFilterByGender = jest.fn();
const handleNextPage = jest.fn();

const usersMock = [
  {
    id: {
      name: 'INSEE',
      value: '2NNaN01776236 16',
    },
    gender: 'Feminino',
    name: {
      title: 'Miss',
      first: 'Louane',
      last: 'Vidal',
    },
    email: 'louane.vidal@example.com',
    dob: {
      date: '26/06/1966',
      age: 55,
    },
    picture: {
      medium: 'https://randomuser.me/api/portraits/women/38.jpg',
    },
  },
  {
    id: {
      name: 'PPS',
      value: '5081227T',
    },
    gender: 'Masculino',
    name: {
      title: 'Mr',
      first: 'Don',
      last: 'White',
    },
    email: 'don.white@example.com',
    dob: {
      date: '26/06/1966',
      age: 55,
    },
    picture: {
      medium: 'https://randomuser.me/api/portraits/med/men/38.jpg',
    },
  },
] as any[];

describe('Table Component', () => {
  test('show users data', () => {
    render(
      <Table
        users={usersMock}
        isLoadingMore={false}
        handleNextPage={handleNextPage}
        handleModal={handleModal}
        handleFilterByGender={handleFilterByGender}
      />
    );

    const tableBody = screen.getByTestId('tableBody');

    expect(tableBody.childElementCount).toEqual(2);
  });

  test('show empty message if doesnt have users', () => {
    const users = [] as any;
    render(
      <Table
        users={users}
        isLoadingMore
        handleNextPage={handleNextPage}
        handleModal={handleModal}
        handleFilterByGender={handleFilterByGender}
      />
    );

    const tableBody = screen.getByTestId('tableBody');
    const message = screen.getByText('Nenhum usuário encontrado');

    expect(tableBody.childElementCount).toEqual(0);
    expect(message).toBeInTheDocument();
  });

  test('load more users when click on button', () => {
    let isLoadingMore = false;

    render(
      <Table
        users={usersMock}
        isLoadingMore={isLoadingMore}
        handleNextPage={handleNextPage}
        handleModal={handleModal}
        handleFilterByGender={handleFilterByGender}
      />
    );

    handleNextPage.mockImplementation(() => {
      isLoadingMore = true;
      usersMock[2] = {
        id: {
          name: 'INSEE',
          value: '1NNaN18631077 64',
        },
        gender: 'Masculino',
        name: {
          title: 'Mr',
          first: 'Loan',
          last: 'Lucas',
        },
        email: 'loan.lucas@example.com',
        dob: {
          date: '26/06/1966',
          age: 55,
        },
        picture: {
          medium: 'https://randomuser.me/api/portraits/med/men/3.jpg',
        },
      };
      isLoadingMore = false;
    });

    const loadMoreButton = screen.getByText('Ver mais');

    fireEvent.click(loadMoreButton);

    expect(usersMock.length).toEqual(3);
  });

  test('filter users by gender', async () => {
    render(
      <Table
        users={usersMock}
        isLoadingMore
        handleNextPage={handleNextPage}
        handleModal={handleModal}
        handleFilterByGender={handleFilterByGender}
      />
    );

    const filter = screen.getByText('Gênero');

    fireEvent.click(filter);

    const maleOption = screen.getByTestId('maleOption');

    fireEvent.click(maleOption);

    expect(handleFilterByGender).toHaveBeenCalled();
    // expect(tableBody.childElementCount).toEqual(1);
  });
});
