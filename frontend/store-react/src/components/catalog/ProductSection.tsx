import type {ProductSummary} from '../../types/catalog';
import {ProductCard} from './ProductCard';
import {EmptyState} from '../ui/AsyncState';
export function ProductSection({title,products}:{title:string;products:ProductSummary[]}){return <section className="container home-section"><div className="section-heading"><h2>{title}</h2><a href="/produtos">Ver todos</a></div>{products.length?<div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<EmptyState title="Nenhum produto nesta seção" description="Novos itens serão publicados em breve."/>}</section>}
