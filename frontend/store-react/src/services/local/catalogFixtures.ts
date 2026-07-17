import type {StoreCategory,StoreProductDetails} from '../../types/catalog';
const image=(id:string,url:string,alt:string)=>({id,url,alt});
const productImageUrls=[
'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3v8FQNBk8taia3RQR2AnzmqA5lIt_kxKJFpt-YXZGhd_k-j-TH-BKGQYaPDaWVOu3Ah1MCWwCKXlO5OFqlZkoR--_gbeS33ij26tslFBXsBfwe6giXddbCkaageoYtYhnBRqmwYjcw-zUUA-hW5bhpAxNPrtBhHD7CHlHopMlDsQ3hh2G-G7g0GpaRMw_AhZ5s2edd5kotZwzWFW9ESDyquyHyJdZvDlyBtbRzZZzeS_EQxEbfYMVgML0II0DhOJ9ecvbvkwcPQ',
'https://lh3.googleusercontent.com/aida-public/AB6AXuArYaXpf1455AACuELAzEEjWFGxaN-pd6-lLOAbRoCw5v8a1mkXIHEZaNBX2kdykEJLe7-T-NeM0q_kqPGCc1dhy8jcl0aYx8sveyIJYRqIDk86Csyo2X1qz0r34bNhaazZpVdUvet0yU1Dg_4ZI7Eq2OMKJUTPL9_fsk_k3wqM_bCv9iSep7KvB4-WXe6vqMtWCgTPfAyZ1rSiezYg3xTDqcUPZ9iMUoobs7Z4_XPwA0-El_l3BIl6OME0zoRe4e8oSoyVIOKpFeQ',
'https://lh3.googleusercontent.com/aida-public/AB6AXuAwNGO7klqLKyWM5r_4qM9OIqYeWOt2g6IBV8z-Wz2BQJEYc-08ni7XWWW38xG8IbGrZEkMqNA_f44vGcYx85x9qUf1C9jWWecIorh7JzES7t1eGX0il03SLGoopvGEkIQh-KtvCLVYQkyeTsxPoVduYQC1XrQTqnkiUrWWxd7NwRY0YvZCoxy6i6SlGFFHMHeoZzL9Hku_JEDRhMZP-PxljFaQfJFmUTbwz1zCNsx-1WPe9nyZlkxcIBCnEdDQFGbqdnwJkOcGcL0'
];
export const categories:StoreCategory[]=[
{id:'cat-eletronicos',slug:'eletronicos',name:'Eletrônicos',description:'Tecnologia para trabalho e lazer.',icon:'⌨'},
{id:'cat-acessorios',slug:'acessorios',name:'Acessórios',description:'Essenciais para seu setup.',icon:'⌁'},
{id:'cat-casa',slug:'casa-e-cozinha',name:'Casa e cozinha',description:'Praticidade para todos os dias.',icon:'⌂'},
{id:'cat-escritorio',slug:'escritorio',name:'Escritório',description:'Conforto e produtividade.',icon:'▣'},
{id:'cat-ferramentas',slug:'ferramentas',name:'Ferramentas',description:'Tudo para seus projetos.',icon:'⚒'},
{id:'cat-esportes',slug:'esportes',name:'Esportes',description:'Movimento e bem-estar.',icon:'◉'}];
const c=(slug:string)=>categories.find(x=>x.slug===slug)!;
const simple=(id:string,name:string,slug:string,sku:string,price:number,url:string,createdAt:string,featured=false,bestSeller=false):StoreProductDetails=>({id,name,description:`${name} combina desempenho confiável, acabamento de qualidade e praticidade para a sua rotina.`,category:c(slug),images:[image(`${id}-img`,url,name)],variants:[{id:`${id}-default`,sku,attributes:{Modelo:'Padrão'},price,availableQuantity:12,available:true}],specifications:[{name:'Garantia',value:'12 meses'},{name:'Origem',value:'Nacional'}],createdAt,featured,bestSeller});
export const products:StoreProductDetails[]=[
{id:'prod-kbd',name:'Teclado Mecânico pantazon Pro',description:'Precisão, conforto e resposta tátil para jornadas intensas. Estrutura reforçada, iluminação ajustável e conexão USB-C removível.',category:c('eletronicos'),images:productImageUrls.map((url,i)=>image(`kbd-${i}`,url,`Teclado Mecânico pantazon Pro — vista ${i+1}`)),variants:[
{id:'var-kbd-001',sku:'PTZ-KBD-001',attributes:{Cor:'Preto',Switch:'Marrom'},price:349.9,compareAtPrice:399.9,availableQuantity:18,available:true},
{id:'var-kbd-002',sku:'PTZ-KBD-002',attributes:{Cor:'Branco',Switch:'Azul'},price:369.9,compareAtPrice:419.9,availableQuantity:9,available:true},
{id:'var-kbd-003',sku:'PTZ-KBD-003',attributes:{Cor:'Preto',Switch:'Vermelho'},price:359.9,availableQuantity:0,available:false}],specifications:[{name:'Conexão',value:'USB-C removível'},{name:'Layout',value:'ABNT2'},{name:'Iluminação',value:'LED branco ajustável'},{name:'Garantia',value:'24 meses'}],createdAt:'2026-07-01',featured:true,bestSeller:true},
simple('prod-headset','Headset Pulse Wireless','acessorios','PTZ-HDP-010',629.9,'https://lh3.googleusercontent.com/aida-public/AB6AXuCKIG0TxjYpZ9quxx3gaMZMxJCcST2FDK4pT6V_rJwF5qhWJKHprvcOgdX8YjaEB0_DwhNDM47esyKy4KlSirP0h4JhQHGEpSSlMyH4RmPgCB1UZtq9kWGB8FBBilgsaQviTofW9lBnr5VeLtAvxmOIKVZ0FJ8S3KuWIe1ni8iPuGIuPitSA2RHR8Cuwgb5sPGM6XpoRnkiQJEIsfvfhCJeu7QaAv7IV18ovHuOFGlVEeLq-KSpqEVvMCkIjjD_ee8bWok1ppETMxA','2026-06-20',true,true),
simple('prod-mouse','Mouse Ergonômico Precision','acessorios','PTZ-MSE-020',249.9,'https://lh3.googleusercontent.com/aida-public/AB6AXuB_SpvIlLWJNrxz3TalG_Aw4_x6K6dNZDw2uL5iWaBFtkXGZzokUg5Yk2r_V7M4jbOMnoSWagPIllEd-JiJUBwoedcJuKP2C4uBqAcpI1HqqYVN0fbz8rifpfioKLECpimLrGxJLtVUH_CGBwgz5xJVWcHBLw6WoVAROatIQGVDEGHOOma6JjocmnQgt1Ci-YNDNMT9rQ1ejmeXZQajFkpduJbZ4QEJNNTR4_fnM6VSKyRXP6sgRImcR7H6_lRuSMOy8TofAHf8zKg','2026-06-28',true,true),
simple('prod-cafeteira','Cafeteira Compacta Aroma','casa-e-cozinha','PTZ-CAF-030',289.9,productImageUrls[1],'2026-07-10',true),
simple('prod-cadeira','Cadeira Ergonômica Work','escritorio','PTZ-CHR-040',1199.9,productImageUrls[2],'2026-05-04',false,true),
simple('prod-furadeira','Furadeira Impact Pro 650W','ferramentas','PTZ-DRL-050',379.9,productImageUrls[0],'2026-07-12'),
simple('prod-garrafa','Garrafa Térmica Sport 750ml','esportes','PTZ-BTL-060',99.9,productImageUrls[1],'2026-07-15'),
simple('prod-monitor','Monitor Business 27 polegadas','eletronicos','PTZ-MON-070',1699.9,'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTX4a_SLrYc69ZnhGFAsoEJaZaJ_L5kj1FJJeucjZwfNG2fy5gQrsOysA3cCTdQ97JKf27hbzW42YlIdILS0cF1z1lobPmKDOLzV7999XuVsnC_SBchm-h6I10rOwIArXTMpSg4ni-NfQSWgFujVPPttFADSxSgl3xioWwFZvPzPW7Rh_4Hbe6uiX8BCwg1DHemEAHSnJdq3dg9vZom8bNpx_dPIGPLZefW-cQVLqL4BprizPGdj2bK7UiltwuXv7Bg_ppUT6XVo','2026-06-01',true,true)
];
