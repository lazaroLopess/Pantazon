import { createContext } from 'react';
import type { StoreCatalogService } from './StoreCatalogService';

export const StoreServiceContext = createContext<StoreCatalogService | null>(null);
