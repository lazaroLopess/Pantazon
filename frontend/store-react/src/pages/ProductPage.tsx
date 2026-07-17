import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductSection } from '../components/catalog/ProductSection';
import { ShippingSimulator } from '../components/product/ShippingSimulator';
import { VariantSelector } from '../components/product/VariantSelector';
import { ErrorState, LoadingGrid } from '../components/ui/AsyncState';
import { useStoreService } from '../services/useStoreService';
import type { ProductSummary, ProductVariant, StoreProductDetails } from '../types/catalog';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
interface ProductRequest { sku: string; product: StoreProductDetails | null; related: ProductSummary[] }

export function ProductPage() {
  const { sku = '' } = useParams();
  const service = useStoreService();
  const [request, setRequest] = useState<ProductRequest>({ sku: '', product: null, related: [] });
  const [selection, setSelection] = useState<{ productId: string; variant: ProductVariant } | null>(null);
  const [gallery, setGallery] = useState<{ productId: string; index: number } | null>(null);
  const [quantity, setQuantity] = useState<{ variantId: string; value: number } | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      const product = await service.getProductBySku(sku);
      if (!product) {
        if (active) setRequest({ sku, product: null, related: [] });
        return;
      }
      const response = await service.getProducts({ category: product.category.slug, sort: 'relevance', page: 1, pageSize: 4 });
      if (active) setRequest({ sku, product, related: response.items.filter((item) => item.id !== product.id) });
    }
    load().catch(() => { if (active) setRequest({ sku, product: null, related: [] }); });
    return () => { active = false; };
  }, [service, sku]);

  if (request.sku !== sku) return <main className="container product-loading"><LoadingGrid label="Carregando produto" /></main>;
  const product = request.product;
  if (!product) return <main className="container state-page"><ErrorState message={`Não encontramos um produto com o SKU “${sku}”.`} /><Link className="button primary" to="/produtos">Voltar ao catálogo</Link></main>;

  const productId = product.id;
  const routeVariant = product.variants.find((variant) => variant.sku.toUpperCase() === sku.toUpperCase()) ?? product.variants[0];
  const selected = selection?.productId === productId ? selection.variant : routeVariant;
  const imageIndex = gallery?.productId === productId ? gallery.index : 0;
  const currentQuantity = quantity?.variantId === selected.id ? quantity.value : 1;
  const discount = selected.compareAtPrice ? Math.round((1 - selected.price / selected.compareAtPrice) * 100) : 0;

  function selectVariant(variant: ProductVariant) {
    setSelection({ productId, variant });
    setQuantity({ variantId: variant.id, value: 1 });
    window.history.replaceState(null, '', `/produtos/${variant.sku}`);
  }

  function add() {
    setNotice('O carrinho será implementado em uma sprint posterior.');
    window.setTimeout(() => setNotice(''), 3500);
  }

  return (
    <main>
      <div className="container">
        <nav className="breadcrumb" aria-label="Navegação estrutural"><Link to="/">Início</Link><span>/</span><Link to={`/produtos?category=${product.category.slug}`}>{product.category.name}</Link><span>/</span><span>{product.name}</span></nav>
        <section className="product-detail">
          <div className="gallery"><div className="thumbnails" aria-label="Imagens do produto">{product.images.map((item, index) => <button key={item.id} className={imageIndex === index ? 'active' : ''} onClick={() => setGallery({ productId: product.id, index })} aria-label={`Ver imagem ${index + 1}`}><img src={item.url} alt="" /></button>)}</div><div className="main-image"><img src={product.images[imageIndex].url} alt={product.images[imageIndex].alt} /></div></div>
          <div className="product-info">
            <span className="eyebrow">{product.category.name}</span><h1>{product.name}</h1><p className="sku">SKU: <strong>{selected.sku}</strong></p>
            <div className="price-block">{selected.compareAtPrice && <del>{money.format(selected.compareAtPrice)}</del>}<div><strong>{money.format(selected.price)}</strong>{discount > 0 && <span className="discount-badge">-{discount}%</span>}</div><small>em até 10x de {money.format(selected.price / 10)} sem juros</small></div>
            <VariantSelector variants={product.variants} selected={selected} onChange={selectVariant} />
            <p className={selected.available ? 'availability available' : 'availability'}>{selected.available ? `Em estoque · ${selected.availableQuantity} disponíveis` : 'Variante indisponível'}</p>
            <div className="purchase-row"><div className="quantity" aria-label="Quantidade"><button aria-label="Diminuir quantidade" onClick={() => setQuantity({ variantId: selected.id, value: Math.max(1, currentQuantity - 1) })}>−</button><output aria-live="polite">{currentQuantity}</output><button aria-label="Aumentar quantidade" onClick={() => setQuantity({ variantId: selected.id, value: Math.min(selected.availableQuantity, currentQuantity + 1) })}>+</button></div><button className="button primary add-button" disabled={!selected.available} onClick={add}>Adicionar ao carrinho</button></div>
            {notice && <p className="cart-notice" role="status">{notice}</p>}<ShippingSimulator sku={selected.sku} />
          </div>
        </section>
        <section className="product-copy"><div><h2>Descrição</h2><p>{product.description}</p></div><div><h2>Especificações</h2><dl>{product.specifications.map((specification) => <div key={specification.name}><dt>{specification.name}</dt><dd>{specification.value}</dd></div>)}</dl></div></section>
      </div>
      <ProductSection title="Produtos relacionados" products={request.related} />
    </main>
  );
}
