import {screen} from '@testing-library/react';
import {Route,Routes} from 'react-router-dom';
import {ProductPage} from './ProductPage';
import {renderStore} from '../test/test-utils';
test('SKU inexistente mostra erro apropriado',async()=>{renderStore(<Routes><Route path="/produtos/:sku" element={<ProductPage/>}/></Routes>,'/produtos/INEXISTENTE');expect(await screen.findByText(/não encontramos um produto/i)).toBeInTheDocument()});
