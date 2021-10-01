import { User, Session } from "@supabase/supabase-js";
import {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";
import {
  getUser,
  getSession,
  onAuthStateChange,
} from "../../services/auth.service";

interface AuthContextProps {
  user?: User;
  session?: Session;
}

const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const { data } = onAuthStateChange(async () => checkUser());

    checkUser();

    return () => {
      data?.unsubscribe();
    };
  }, []);

  async function checkUser(): Promise<void> {
    const user = getUser();
    const session = getSession();
    setUser(user);
    setSession(session);
  }

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
