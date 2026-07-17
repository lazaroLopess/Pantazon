import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route,Routes,useLocation} from 'react-router-dom';
import {StoreLayout} from './StoreLayout';
import {renderStore} from '../../test/test-utils';
function Query(){return <span data-testid="query">{useLocation().search}</span>}
test('busca do shell envia a query para o catálogo',async()=>{renderStore(<Routes><Route element={<StoreLayout/>}><Route path="/" element={<div>Home</div>}/><Route path="/produtos" element={<Query/>}/></Route></Routes>);await userEvent.type(screen.getByLabelText('Buscar produtos'),'teclado');await userEvent.click(screen.getByRole('button',{name:'Buscar'}));expect(screen.getByTestId('query')).toHaveTextContent('?search=teclado')});
