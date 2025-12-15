import { useAzureAd } from '@/context/AzureAdContext';

export const useAzureAdAuth = () => {
  const { isAuthenticated, loading } = useAzureAd();
  return { isAuthenticated, loading };
};

export const useAzureAdUser = () => {
  const { user } = useAzureAd();
  return user;
};

export const useAzureAdLogin = () => {
  const { login } = useAzureAd();
  return login;
};

export const useAzureAdLogout = () => {
  const { logout } = useAzureAd();
  return logout;
};