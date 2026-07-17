import {screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CatalogPage} from './CatalogPage';
import {readQuery} from '../features/catalog/catalogQuery';
import {renderStore} from '../test/test-utils';
test('interpreta a query da URL',()=>{expect(readQuery(new URLSearchParams('search=teclado&sort=price_asc&page=2'))).toMatchObject({search:'teclado',sort:'price_asc',page:2})});
test('aplica categoria e altera ordenação',async()=>{renderStore(<CatalogPage/>,'/produtos');await screen.findByText('Teclado Mecânico pantazon Pro');await userEvent.click(screen.getByLabelText('Esportes'));await waitFor(()=>expect(screen.getByText('Garrafa Térmica Sport 750ml')).toBeInTheDocument());await userEvent.selectOptions(screen.getByLabelText(/ordenar por/i),'price_desc');expect(screen.getByLabelText(/ordenar por/i)).toHaveValue('price_desc')});
