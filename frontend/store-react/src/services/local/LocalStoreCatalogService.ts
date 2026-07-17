import type {StoreCatalogService} from '../StoreCatalogService';
import type {ProductSearchQuery,ProductSummary,ShippingQuoteInput} from '../../types/catalog';
import {categories,products} from './catalogFixtures';
const delay=(ms=180)=>new Promise<void>(resolve=>setTimeout(resolve,ms));
const summary=(p:typeof products[number]):ProductSummary=>({id:p.id,name:p.name,category:p.category,image:p.images[0],variant:p.variants.find(v=>v.available)??p.variants[0],createdAt:p.createdAt});
export class LocalStoreCatalogService implements StoreCatalogService{
 async getHome(){await delay();const all=products.map(summary);return{categories,featured:products.filter(p=>p.featured).map(summary),bestSellers:products.filter(p=>p.bestSeller).map(summary),newArrivals:[...all].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,4)}}
 async getProducts(q:ProductSearchQuery){await delay();let list=products.map(summary);const term=q.search?.trim().toLocaleLowerCase('pt-BR');if(term)list=list.filter(p=>`${p.name} ${p.category.name} ${p.variant.sku}`.toLocaleLowerCase('pt-BR').includes(term));if(q.category)list=list.filter(p=>p.category.slug===q.category);if(q.minPrice!==undefined)list=list.filter(p=>p.variant.price>=q.minPrice!);if(q.maxPrice!==undefined)list=list.filter(p=>p.variant.price<=q.maxPrice!);if(q.available)list=list.filter(p=>p.variant.available);if(q.sort==='price_asc')list.sort((a,b)=>a.variant.price-b.variant.price);if(q.sort==='price_desc')list.sort((a,b)=>b.variant.price-a.variant.price);if(q.sort==='newest')list.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));const total=list.length,totalPages=Math.ceil(total/q.pageSize);return{items:list.slice((q.page-1)*q.pageSize,q.page*q.pageSize),total,page:q.page,pageSize:q.pageSize,totalPages}}
 async getProductBySku(sku:string){await delay();return products.find(p=>p.variants.some(v=>v.sku.toUpperCase()===sku.toUpperCase()))??null}
 async getCategories(){await delay(80);return categories}
 async simulateShipping(input:ShippingQuoteInput){await delay(550);if(!/^\d{8}$/.test(input.cep))throw new Error('Informe um CEP válido com 8 números.');return{cep:input.cep,options:[{id:'standard',name:'Entrega padrão',estimate:'5 a 7 dias úteis',price:19.9},{id:'express',name:'Entrega expressa',estimate:'2 a 3 dias úteis',price:34.9}]}}
}
