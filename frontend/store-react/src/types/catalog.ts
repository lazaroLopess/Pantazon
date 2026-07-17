export interface StoreCategory {id:string;slug:string;name:string;description:string;icon:string}
export interface ProductImage {id:string;url:string;alt:string}
export interface ProductVariant {id:string;sku:string;attributes:Record<string,string>;price:number;compareAtPrice?:number;availableQuantity:number;available:boolean}
export interface ProductSpecification {name:string;value:string}
export interface StoreProductDetails {id:string;name:string;description:string;category:StoreCategory;images:ProductImage[];variants:ProductVariant[];specifications:ProductSpecification[];createdAt:string;featured?:boolean;bestSeller?:boolean}
export interface ProductSummary {id:string;name:string;category:StoreCategory;image:ProductImage;variant:ProductVariant;createdAt:string}
export interface HomePageData {categories:StoreCategory[];featured:ProductSummary[];bestSellers:ProductSummary[];newArrivals:ProductSummary[]}
export type ProductSort='relevance'|'price_asc'|'price_desc'|'newest';
export interface ProductSearchQuery {search?:string;category?:string;minPrice?:number;maxPrice?:number;available?:boolean;sort:ProductSort;page:number;pageSize:number}
export interface PaginatedProducts {items:ProductSummary[];total:number;page:number;pageSize:number;totalPages:number}
export interface ShippingQuoteInput {cep:string;sku:string}
export interface ShippingOption {id:string;name:string;estimate:string;price:number}
export interface ShippingQuoteResult {cep:string;options:ShippingOption[]}
