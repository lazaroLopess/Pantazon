import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShippingSimulator} from './ShippingSimulator';
import {formatCep} from './shipping';
import {renderStore} from '../../test/test-utils';
test('formata e valida CEP',async()=>{expect(formatCep('01310930')).toBe('01310-930');renderStore(<ShippingSimulator sku="PTZ-KBD-001"/>);await userEvent.type(screen.getByLabelText('CEP'),'123');await userEvent.click(screen.getByRole('button',{name:'Calcular'}));expect(screen.getByRole('alert')).toHaveTextContent('CEP válido')});
