using Microsoft.AspNetCore.Mvc;
using Pantazon.Application.CatalogContracts;
using Pantazon.Domain.Entities;

namespace Pantazon.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController(ICatalogService service) : ControllerBase
    {
        [HttpGet("home")]
        [ProducesResponseType<HomeResponse>(StatusCodes.Status200OK)]
        public async Task<ActionResult<HomeResponse>> Home()
        {
            var response = await service.GetHomeAsync();
            return Ok(response);
        }

        [HttpGet("products")]
        [ProducesResponseType<IReadOnlyList<Product>>(StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(
            [FromQuery] ProductSearchRequest request)
        {
            var products = await service.GetStoreProductsAsync(request);
            return Ok(products);
        }

        [HttpGet("products/by-sku/{sku}")]
        [ProducesResponseType<ProductVariant>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductVariant>> GetBySku(
            [FromRoute] string sku)
        {
            var variant = await service.GetBySkuAsync(sku);

            if (variant is null)
            {
                return NotFound(new ProblemDetails
                {
                    Type = "product_variant_not_found",
                    Title = "Variante não encontrada",
                    Status = StatusCodes.Status404NotFound,
                    Detail = $"Nenhuma variante foi encontrada para o SKU '{sku}'."
                });
            }

            return Ok(variant);
        }

        [HttpPost("products")]
        [ProducesResponseType<CreateProductResponse>(StatusCodes.Status201Created)]
        [ProducesResponseType<CreateProductResponse>(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateProductResponse>> CreateProduct(
            [FromBody] CreateProductRequest request)
        {
            var response = await service.CreateProductAsync(request);

            if (!response.Created)
            {
                return BadRequest(response);
            }

            return StatusCode(StatusCodes.Status201Created, response);
        }
    }
}