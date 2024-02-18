import {
  Actor,
  ActorMethod,
  ActorSubclass,
  HttpAgent,
  Identity,
} from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { idlFactory } from '../declarations/backend';

export interface AuthContextType {
  isAuthenticatedIC: boolean;
  IsAuthenticatedWithData: boolean;
  login: () => void;
  logout: () => void;
  authClient: AuthClient;
  identity: Identity | undefined;
  principal: Principal | undefined;
  fakePrincipal: string | undefined;
  whoamiActor:
    | ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>
    | undefined;
  fakeLogin: () => void;
  fakeLogout: () => void;
  loginWithData: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticatedIC, setIsAuthenticatedIC] = useState(false); //true se ha fatto l'accesso con Internet ID
  const [IsAuthenticatedWithData, setIsAuthenticatedWithData] = useState(false); //true se si è registrato e il sistema  l'ha riconosciuto
  const [authClient, setAuthClient] = useState<AuthClient>({} as AuthClient);
  const [identity, setIdentity] = useState<Identity>();
  const [principal, setPrincipal] = useState<Principal>();
  const [fakePrincipal, setFakePrincipal] = useState<string>('principal');
  const [whoamiActor, setWhoamiActor] =
    useState<ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>>();

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticatedIC = await client.isAuthenticated();
    setIsAuthenticatedIC(isAuthenticatedIC);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    setAuthClient(client);

    const actor = Actor.createActor(idlFactory, {
      canisterId: Principal.fromText(
        process.env.BACKEND_CANISTER_ID ? process.env.BACKEND_CANISTER_ID : '',
      ),
      agent: new HttpAgent({ identity }),
    });

    setWhoamiActor(actor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  const fakeLogin = () => {
    setIsAuthenticatedIC(true);
  };
  //these two fake functions are for testing purposes, since the IC Identity canister is only available on the mainnet

  const fakeLogout = () => {
    setIsAuthenticatedIC(false);
    setIsAuthenticatedWithData(false);
  };

  const loginWithData = () => {
    setIsAuthenticatedWithData(true);
  };

  return {
    isAuthenticatedIC,
    IsAuthenticatedWithData,
    login,
    logout,
    fakeLogin,
    fakeLogout,
    loginWithData,
    authClient,
    identity,
    principal,
    fakePrincipal,
    whoamiActor,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
