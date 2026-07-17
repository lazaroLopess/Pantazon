import { Route, Routes } from 'react-router-dom';
import { StoreLayout } from '../components/layout/StoreLayout';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
export function App(){return <Routes><Route element={<StoreLayout/>}><Route path="/" element={<HomePage/>}/><Route path="/produtos" element={<CatalogPage/>}/><Route path="/produtos/:sku" element={<ProductPage/>}/><Route path="*" element={<main className="container state-page"><h1>Página não encontrada</h1><a href="/">Voltar ao início</a></main>}/></Route></Routes>}
