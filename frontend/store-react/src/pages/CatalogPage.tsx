import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/catalog/ProductCard';
import { EmptyState, ErrorState, LoadingGrid } from '../components/ui/AsyncState';
import { productSortLabels, productSorts, readQuery } from '../features/catalog/catalogQuery';
import { useStoreService } from '../services/useStoreService';
import type { PaginatedProducts, ProductSearchQuery, StoreCategory } from '../types/catalog';

interface CatalogRequestState { key: string; result: PaginatedProducts | null; error: string }

export function CatalogPage() {
  const service = useStoreService();
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => readQuery(params), [params]);
  const queryKey = params.toString();
  const [request, setRequest] = useState<CatalogRequestState>({ key: '', result: null, error: '' });
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    let active = true;
    service.getCategories().then((items) => { if (active) setCategories(items); });
    return () => { active = false; };
  }, [service]);

  useEffect(() => {
    let active = true;
    service.getProducts(query).then(
      (result) => { if (active) setRequest({ key: queryKey, result, error: '' }); },
      () => { if (active) setRequest({ key: queryKey, result: null, error: 'Não foi possível consultar o catálogo.' }); },
    );
    return () => { active = false; };
  }, [query, queryKey, service]);

  function update(key: string, value: string | undefined, resetPage = true) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    if (resetPage) next.delete('page');
    setParams(next);
  }

  const current = request.key === queryKey ? request : null;
  const filters = <CatalogFilters categories={categories} query={query} update={update} clear={() => { setParams({}); setDrawer(false); }} />;

  return (
    <main className="catalog-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Navegação estrutural"><Link to="/">Início</Link><span>/</span><span>Produtos</span></nav>
        <div className="catalog-title"><div><h1>Catálogo de produtos</h1><p>{current?.result?.total ?? 0} produtos encontrados</p></div><button className="button secondary mobile-filter" onClick={() => setDrawer(true)}>Filtros</button></div>
        <CatalogSearch key={query.search ?? ''} initialValue={query.search ?? ''} onSearch={(value) => update('search', value || undefined)} />
        <div className="catalog-layout">
          <aside className="filters" aria-label="Filtros"><h2>Filtros</h2>{filters}</aside>
          <section className="catalog-results" aria-live="polite">
            <div className="sort-row"><span>{query.search && <>Resultados para <strong>“{query.search}”</strong></>}</span><label>Ordenar por<select value={query.sort} onChange={(event) => update('sort', event.target.value)}>{productSorts.map((sort) => <option value={sort} key={sort}>{productSortLabels[sort]}</option>)}</select></label></div>
            {!current ? <LoadingGrid /> : current.error ? <ErrorState message={current.error} /> : current.result?.items.length ? (
              <><div className="product-grid catalog-grid">{current.result.items.map((product) => <ProductCard product={product} key={product.id} />)}</div><nav className="pagination" aria-label="Paginação"><button disabled={query.page <= 1} onClick={() => update('page', String(query.page - 1), false)}>Anterior</button><span>Página {query.page} de {Math.max(1, current.result.totalPages)}</span><button disabled={query.page >= current.result.totalPages} onClick={() => update('page', String(query.page + 1), false)}>Próxima</button></nav></>
            ) : <EmptyState title="Nenhum produto encontrado" description="Tente remover filtros ou buscar por outro termo." />}
          </section>
        </div>
      </div>
      {drawer && <div className="drawer-backdrop" onMouseDown={() => setDrawer(false)}><aside className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filtros do catálogo" onMouseDown={(event) => event.stopPropagation()}><div><h2>Filtros</h2><button aria-label="Fechar filtros" onClick={() => setDrawer(false)}>×</button></div>{filters}<button className="button primary" onClick={() => setDrawer(false)}>Ver resultados</button></aside></div>}
    </main>
  );
}

function CatalogSearch({ initialValue, onSearch }: { initialValue: string; onSearch: (value: string) => void }) {
  const [value, setValue] = useState(initialValue);
  function submit(event: FormEvent) { event.preventDefault(); onSearch(value.trim()); }
  return <form className="catalog-search" role="search" onSubmit={submit}><label className="sr-only" htmlFor="catalog-search">Buscar no catálogo</label><input id="catalog-search" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Buscar por produto ou SKU" /><button className="button primary">Buscar</button></form>;
}

function CatalogFilters({ categories, query, update, clear }: { categories: StoreCategory[]; query: ProductSearchQuery; update: (key: string, value: string | undefined) => void; clear: () => void }) {
  return <div className="filter-fields"><fieldset><legend>Categoria</legend><label><input type="radio" name="category" checked={!query.category} onChange={() => update('category', undefined)} /> Todas</label>{categories.map((category) => <label key={category.id}><input type="radio" name="category" checked={query.category === category.slug} onChange={() => update('category', category.slug)} /> {category.name}</label>)}</fieldset><fieldset><legend>Faixa de preço</legend><label>Preço mínimo<input aria-label="Preço mínimo" type="number" min="0" value={query.minPrice ?? ''} onChange={(event) => update('minPrice', event.target.value || undefined)} /></label><label>Preço máximo<input aria-label="Preço máximo" type="number" min="0" value={query.maxPrice ?? ''} onChange={(event) => update('maxPrice', event.target.value || undefined)} /></label></fieldset><label className="check"><input type="checkbox" checked={query.available ?? false} onChange={(event) => update('available', event.target.checked ? 'true' : undefined)} /> Somente disponíveis</label><button className="button secondary" onClick={clear}>Limpar filtros</button></div>;
}
