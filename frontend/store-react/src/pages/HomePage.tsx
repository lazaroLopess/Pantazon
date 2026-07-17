import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/catalog/ProductSection';
import { ErrorState, LoadingGrid } from '../components/ui/AsyncState';
import { useStoreService } from '../services/useStoreService';
import type { HomePageData } from '../types/catalog';

const hero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFyWQqXB50zztvUYuk7fIGsPc4CzYjL3Motjj6otG_h5hVbmf60kvXiHwiHGyj3BeVp99BcIvK84-Hxg0imxtI4XFxdlGSSO3vl0H-uCx8jKt35de3G14OEIvRrdyZe_jnkqZxXRBr4HlwUogibMKGNc0M32R6BPrfjnUriwayxZRg9Ur7dNE7uC5DxZwc2vyLuZhgdQH8qr-SoRLHEOzfh28WxdCsAhPXIUn4YCxfM-MORf2YFwlsDmrNVQo2I9QeFkdSmZhVoBQ';

interface HomeRequestState {
  attempt: number;
  data: HomePageData | null;
  error: string;
}

export function HomePage() {
  const service = useStoreService();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState<HomeRequestState>({ attempt: -1, data: null, error: '' });
  const [term, setTerm] = useState('');

  useEffect(() => {
    let active = true;
    service.getHome().then(
      (data) => {
        if (active) setRequest({ attempt, data, error: '' });
      },
      () => {
        if (active) setRequest({ attempt, data: null, error: 'Confira sua conexão e tente novamente.' });
      },
    );
    return () => { active = false; };
  }, [attempt, service]);

  function search(event: FormEvent) {
    event.preventDefault();
    navigate(`/produtos?search=${encodeURIComponent(term.trim())}`);
  }

  const loading = request.attempt !== attempt;
  const data = loading ? null : request.data;
  const error = loading ? '' : request.error;

  return (
    <main>
      <section className="hero">
        <img src={hero} alt="Setup de trabalho moderno com produtos pantazon" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span>Seleção pantazon</span>
          <h1>Tecnologia que acompanha o seu ritmo</h1>
          <p>Produtos escolhidos para entregar desempenho, qualidade e praticidade todos os dias.</p>
          <Link className="button primary" to="/produtos">Explorar produtos</Link>
        </div>
      </section>
      <form className="mobile-home-search container" onSubmit={search} role="search">
        <label htmlFor="home-search">Encontre seu próximo produto</label>
        <div>
          <input id="home-search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Busque por nome ou SKU" />
          <button className="button primary">Buscar</button>
        </div>
      </form>
      {error ? (
        <div className="container"><ErrorState message={error} onRetry={() => setAttempt((value) => value + 1)} /></div>
      ) : !data ? (
        <div className="container home-loading"><LoadingGrid /></div>
      ) : (
        <>
          <section className="container home-section">
            <div className="section-heading"><h2>Compre por categoria</h2><Link to="/produtos">Ver catálogo</Link></div>
            <div className="category-grid">
              {data.categories.map((category) => (
                <Link key={category.id} to={`/produtos?category=${category.slug}`}>
                  <span aria-hidden="true">{category.icon}</span><strong>{category.name}</strong><small>{category.description}</small>
                </Link>
              ))}
            </div>
          </section>
          <ProductSection title="Produtos em destaque" products={data.featured} />
          <ProductSection title="Mais vendidos" products={data.bestSellers} />
          <ProductSection title="Novidades" products={data.newArrivals} />
        </>
      )}
      <section className="benefits">
        <div className="container benefit-grid">
          <div><span>♢</span><strong>Compra segura</strong><small>Seus dados sempre protegidos</small></div>
          <div><span>▤</span><strong>Entrega para todo o Brasil</strong><small>Acompanhe cada etapa</small></div>
          <div><span>↺</span><strong>Troca facilitada</strong><small>Atendimento sem complicação</small></div>
          <div><span>◷</span><strong>Suporte especializado</strong><small>Conte com a nossa equipe</small></div>
        </div>
      </section>
    </main>
  );
}
