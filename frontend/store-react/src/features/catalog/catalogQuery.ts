import type { ProductSearchQuery, ProductSort } from '../../types/catalog';

export const productSorts: ProductSort[] = ['relevance', 'price_asc', 'price_desc', 'newest'];

export const productSortLabels: Record<ProductSort, string> = {
  relevance: 'Relevância',
  price_asc: 'Menor preço',
  price_desc: 'Maior preço',
  newest: 'Mais recentes',
};

function parseNonNegativeNumber(value: string | null) {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

export function readQuery(params: URLSearchParams): ProductSearchQuery {
  const sort = params.get('sort') as ProductSort;
  return {
    search: params.get('search') || undefined,
    category: params.get('category') || undefined,
    minPrice: parseNonNegativeNumber(params.get('minPrice')),
    maxPrice: parseNonNegativeNumber(params.get('maxPrice')),
    available: params.get('available') === 'true' || undefined,
    sort: productSorts.includes(sort) ? sort : 'relevance',
    page: Math.max(1, Number(params.get('page')) || 1),
    pageSize: 6,
  };
}
