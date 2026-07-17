import { useMemo, type PropsWithChildren } from 'react';
import type { StoreCatalogService } from './StoreCatalogService';
import { LocalStoreCatalogService } from './local/LocalStoreCatalogService';
import { StoreServiceContext } from './storeServiceContext';

interface StoreServiceProviderProps {
  service?: StoreCatalogService;
}

export function StoreServiceProvider({ children, service }: PropsWithChildren<StoreServiceProviderProps>) {
  const value = useMemo(() => service ?? new LocalStoreCatalogService(), [service]);
  return <StoreServiceContext.Provider value={value}>{children}</StoreServiceContext.Provider>;
}
