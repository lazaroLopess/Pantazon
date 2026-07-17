import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { renderStore } from '../test/test-utils';
import { ProductPage } from './ProductPage';

test('variante atualiza SKU e preço', async () => {
  renderStore(
    <Routes><Route path="/produtos/:sku" element={<ProductPage />} /></Routes>,
    '/produtos/PTZ-KBD-001',
  );
  await screen.findByRole('heading', { name: 'Teclado Mecânico pantazon Pro' });
  await userEvent.click(screen.getByRole('button', { name: /branco \/ azul/i }));
  expect(screen.getByText('PTZ-KBD-002')).toBeInTheDocument();
  expect(screen.getByText(/R\$\s369,90/)).toBeInTheDocument();
});
