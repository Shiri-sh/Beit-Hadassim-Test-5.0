using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly StoreDbContext _context;

    public ProductController(StoreDbContext context)
    {
        _context = context;
    }
    // GET: api/<ProductController>
    [HttpGet]
    //return all products
    async public Task<ActionResult<IEnumerable<Good>>> Get()
    {
        var prods = await _context.Product.ToListAsync();
        if (prods == null || prods.Count == 0) { return NotFound("you dont have products"); }
        return Ok(prods);
    }

    // GET api/<ProductController>/5
    [HttpGet("{id}")]
    //return product with spacific id
    async public Task<ActionResult<Product>> Get(int id)
    {
        var prod = await _context.Product.FindAsync(id);
        if (prod == null) { return NotFound("no product with such id exist"); }
        return Ok(prod);
    }

}
