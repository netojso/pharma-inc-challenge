import { User } from '../types/User';

export const formatUserData = (data: any) => {
  if (data === null || data.length === 0) return [];

  return data.results.map((user: User) => {
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
  });
};
