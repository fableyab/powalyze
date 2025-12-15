import React, { createContext, useContext, useState, useEffect } from 'react';
import { azureAdService, initializeAzureAD } from '@/services/auth/azureAdService';
import { useToast } from '@/components/ui/use-toast';

const AzureAdContext = createContext();

export const AzureAdProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      try {
        const msal = await initializeAzureAD();
        const accounts = msal.getAllAccounts();
        if (accounts.length > 0) {
          msal.setActiveAccount(accounts[0]);
          setUser(accounts[0]);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Azure AD Init Error", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const response = await azureAdService.login();
      if (response && response.account) {
        setUser(response.account);
        setIsAuthenticated(true);
        toast({ title: "Azure AD Login Success", description: `Welcome, ${response.account.name}` });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await azureAdService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast({ title: "Logged Out", description: "Successfully logged out from Azure AD" });
    } catch (error) {
      toast({ variant: "destructive", title: "Logout Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AzureAdContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AzureAdContext.Provider>
  );
};

export const useAzureAd = () => useContext(AzureAdContext);