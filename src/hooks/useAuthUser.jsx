// hooks/useAuthUser.js
import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../utils/Fetch';

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await fetchInstance.get({
        endpoint: '/auth/me',
        credentials: 'include'
      });

      const text = await response.text();
      if (!text) throw new Error('Respuesta vacía');
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data?.message || 'No autenticado');
      }

      return data.data; // tu backend debe devolver { data: {...usuario} }
    },
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 min sin refetch
  });
};
