using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SupplierController : ControllerBase
{
    private readonly StoreDbContext _context; 

    public SupplierController(StoreDbContext context) 
    {
        _context = context;
    }

    // GET api/<SupplierController>/5
    [HttpGet("{pass}")]
    //return supplier by password
    async public Task<ActionResult<Supplier>> Get(string pass)
    {
        var sup = await _context.Supplier.Include(s => s.Goods).FirstOrDefaultAsync(s => s.NumberPhone == pass);
        if (sup == null) { return NotFound("wrong password "); }
        return Ok(sup);
    }
    [HttpGet]
    //return all suppliers
    async public Task<ActionResult<Supplier>> Get()
    {
       
        var sups = await _context.Supplier.ToListAsync();
        if (sups == null|| sups.Count() == 0) { return NotFound("No suppliers"); }
        return Ok(sups);
    }

    //POST api/<SupplierController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Supplier s)
    {
        if (s == null)
        {
            return BadRequest("Invalid order data.");
        }

        var supplier = new Supplier
        {
            ID = s.ID,
            AgentName = s.AgentName,
            CompanyName = s.CompanyName,
            NumberPhone = s.NumberPhone,
            Goods = new List<Good>()

        };
        //add the goods
        foreach (var item in s.Goods) {
            var good = new Good
            {
                ProductID = item.ProductID,
                PricePerItem = item.PricePerItem,
                MinimumQuantityForOrder = item.MinimumQuantityForOrder,
                SupplierID = s.ID,
            };
            supplier.Goods.Add(good);
        }
        _context.Supplier.Add(supplier);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), new { id = supplier.ID }, supplier);
    }
}
