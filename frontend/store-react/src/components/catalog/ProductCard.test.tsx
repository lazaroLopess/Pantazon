import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, useLocation } from 'react-router-dom';
import { products } from '../../services/local/catalogFixtures';
import { renderStore } from '../../test/test-utils';
import { ProductCard } from './ProductCard';

const product = products[0];
const summary = {
  id: product.id,
  name: product.name,
  category: product.category,
  image: product.images[0],
  variant: product.variants[0],
  createdAt: product.createdAt,
};

function Location() {
  return <span>{useLocation().pathname}</span>;
}

test('mostra nome e preço e navega para o SKU', async () => {
  renderStore(
    <Routes>
      <Route path="/" element={<ProductCard product={summary} />} />
      <Route path="*" element={<Location />} />
    </Routes>,
  );
  expect(screen.getByText('Teclado Mecânico pantazon Pro')).toBeInTheDocument();
  expect(screen.getByText(/R\$\s349,90/)).toBeInTheDocument();
  await userEvent.click(screen.getByRole('link', { name: /ver teclado/i }));
  expect(screen.getByText('/produtos/PTZ-KBD-001')).toBeInTheDocument();
});
