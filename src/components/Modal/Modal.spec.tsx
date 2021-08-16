import React from 'react';

import { render, screen } from '@testing-library/react';

import { Modal } from '.';

const handleModal = jest.fn();

const userMock = {
  gender: 'Feminino',
  name: {
    title: 'Miss',
    first: 'Louane',
    last: 'Vidal',
  },
  location: {
    street: {
      number: 2479,
      name: 'Place du 8 Février 1962',
    },
    country: 'França',
  },
  email: 'louane.vidal@example.com',
  dob: {
    date: '26/06/1966',
    age: 55,
  },
  cell: '06-07-80-83-11',
  id: {
    name: 'INSEE',
    value: '2NNaN01776236 16',
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/women/88.jpg',
  },
  nat: 'FR',
} as any;

describe('Modal Component', () => {
  test('show user info correctly', () => {
    render(<Modal user={userMock} showModal handleModal={handleModal} />);

    expect(screen.queryByText('Louane Vidal')).toBeInTheDocument();
    expect(screen.queryByText('França')).toBeInTheDocument();
  });

  // test('close modal on click in button', () => {
  //   render(<Modal user={userMock} showModal handleModal={handleModal} />);

  //   const closeButton = screen.getByTestId('closeButton');
  //   console.log('Here ============>', closeButton);
  //   fireEvent.click(closeButton);

  //   expect(handleModal).toHaveBeenCalled();
  // });
});
