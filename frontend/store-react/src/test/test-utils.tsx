import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import type {ReactElement} from 'react';
import {StoreServiceProvider} from '../services/StoreServiceContext';
export function renderStore(ui:ReactElement,route='/'){return render(<MemoryRouter initialEntries={[route]}><StoreServiceProvider>{ui}</StoreServiceProvider></MemoryRouter>)}
