import { render, screen, fireEvent } from '@testing-library/react';

import { SearchInput } from '.';

const handleSearchUser = jest.fn();
const handleFilterByNacionality = jest.fn();

describe('SearchInput Component', () => {
  test('search input renders correctly', () => {
    render(
      <SearchInput
        handleFilterByNacionality={handleFilterByNacionality}
        handleSearchUser={handleSearchUser}
      />
    );

    expect(
      screen.getByPlaceholderText('Pesquise pelo nome')
    ).toBeInTheDocument();
    expect(screen.getByText('Filtrar')).toBeInTheDocument();
  });

  test('show filter by nationality container when click in filter button', () => {
    render(
      <SearchInput
        handleFilterByNacionality={handleFilterByNacionality}
        handleSearchUser={handleSearchUser}
      />
    );

    const filterButton = screen.getByText('Filtrar');

    fireEvent.click(filterButton);

    expect(screen.getByText('Nacionalidade')).toBeInTheDocument();
  });

  test('calls handleFilterByNacionality function with correct value', () => {
    render(
      <SearchInput
        handleFilterByNacionality={handleFilterByNacionality}
        handleSearchUser={handleSearchUser}
      />
    );

    const filterButton = screen.getByText('Filtrar');

    fireEvent.click(filterButton);

    const natioFilterButton = screen.getByText('Nenhuma');

    fireEvent.click(natioFilterButton);

    const nationalityOption = screen.getByText('Brasil');

    fireEvent.click(nationalityOption);

    expect(handleFilterByNacionality).toHaveBeenCalledWith('BR');
  });

  test('calls handleSearchUser function with correct values', () => {
    render(
      <SearchInput
        handleFilterByNacionality={handleFilterByNacionality}
        handleSearchUser={handleSearchUser}
      />
    );

    const searchInput = screen.getByPlaceholderText('Pesquise pelo nome');

    fireEvent.change(searchInput, { target: { value: 'John Doe' } });

    expect(handleSearchUser).toHaveBeenCalledWith('John Doe');
  });
});
