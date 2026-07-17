import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderStore} from '../../test/test-utils';
import {VariantSelector} from './VariantSelector';
import {products} from '../../services/local/catalogFixtures';
test('seleciona variante disponível e desabilita indisponível',async()=>{const variants=products[0].variants;const change=vi.fn();renderStore(<VariantSelector variants={variants} selected={variants[0]} onChange={change}/>);await userEvent.click(screen.getByRole('button',{name:/branco \/ azul/i}));expect(change).toHaveBeenCalledWith(variants[1]);expect(screen.getByRole('button',{name:/vermelho/i})).toBeDisabled()});
