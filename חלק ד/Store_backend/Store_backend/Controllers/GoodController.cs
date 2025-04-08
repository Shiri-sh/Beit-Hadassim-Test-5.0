using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GoodController : ControllerBase
{
    private readonly StoreDbContext _context; 
    public GoodController(StoreDbContext context) 
    {
        _context = context;
    }
    // GET: api/<GoodController>
    [HttpGet("{name}")]
    //return if exist such good with this name
    async public Task<ActionResult<IEnumerable<Good>>> Get(string name)
    {
        var goods = await _context.Good.Where(g=>g.Product.ProductName==name).ToListAsync();
        if (goods == null || goods.Count == 0) { return NotFound("no such good"); }
        return Ok(goods);
    }

    // GET api/<GoodController>/5
    [HttpGet("{prod}/{sup}")]
    //return if the combination of product and supplier exist
    async public Task<ActionResult<Good>> Get(int prod, int sup)
    {
        var good = await _context.Good.Where(g=>g.ProductID== prod && g.SupplierID== sup).ToListAsync();
        if (good == null || good.Count == 0) { return NotFound("this supplier doesnt provide that good "); }
        return Ok(good);
    }

}
