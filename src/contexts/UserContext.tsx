import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserRole } from '@/lib/mockDatabase';

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  // Mock User Info based on role
  userId: string;
  userName: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('agrilink_current_user');
    return (saved as UserRole) || null;
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem('agrilink_current_user', newRole);
    } else {
      localStorage.removeItem('agrilink_current_user');
    }
  };

  const getMockUserInfo = () => {
    switch (role) {
      case 'farmer':
        return { userId: 'f1', userName: 'Ramesh Kumar' };
      case 'buyer':
        return { userId: 'b1', userName: 'FreshKart Organics' };
      case 'fpo':
        return { userId: 'fpo1', userName: 'Karnal FPO Cooperative' };
      default:
        return { userId: '', userName: '' };
    }
  };

  const { userId, userName } = getMockUserInfo();

  return (
    <UserContext.Provider value={{ role, setRole, userId, userName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
