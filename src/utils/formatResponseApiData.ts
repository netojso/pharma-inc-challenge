import { User } from '../types/User';

const translateCountryName = (countryName: string) => {
  switch (countryName) {
    case 'Australia':
      return 'Austrália';
    case 'Brazil':
      return 'Brasil';
    case 'Canada':
      return 'Canadá';
    case 'Switzerland':
      return 'Suécia';
    case 'Germany':
      return 'Alemanha';
    case 'Denmark':
      return 'Dinamarca';
    case 'Spain':
      return 'Espanha';
    case 'Finland':
      return 'Finlândia';
    case 'France':
      return 'França';
    case 'United Kingdom':
      return 'Reino Unido';
    case 'Ireland':
      return 'Irlanda';
    case 'Iran':
      return 'Irã';
    case 'Netherlands':
      return 'Holanda';
    case 'Norway':
      return 'Noruega';
    case 'New Zealand':
      return 'Nova Zelândia';
    case 'Turkey':
      return 'Túrquia';
    case 'United States':
      return 'Estados Unidos';

    default:
      return '';
  }
};

const translateGender = (gender: string) => {
  const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  switch (formattedGender) {
    case 'Male':
      return 'Masculino';

    case 'Female':
      return 'Feminimo';

    default:
      return '';
  }
};

export const formatUserData = (data: any) => {
  if (data === null || data.length === 0) return [];

  return data.results.map((user: User) => {
    return {
      ...user,
      location: {
        ...user.location,
        country: translateCountryName(user.location.country),
      },
      gender: translateGender(user.gender),
      dob: {
        age: user.dob.age,
        date: new Date(user.dob.date).toLocaleDateString('pt-BR', {
          timeZone: 'UTC',
        }),
      },
    };
  });
};
