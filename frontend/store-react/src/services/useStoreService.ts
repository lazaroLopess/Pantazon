import { useContext } from 'react';
import { StoreServiceContext } from './storeServiceContext';

export function useStoreService() {
  const service = useContext(StoreServiceContext);
  if (!service) throw new Error('StoreServiceProvider não configurado.');
  return service;
}
