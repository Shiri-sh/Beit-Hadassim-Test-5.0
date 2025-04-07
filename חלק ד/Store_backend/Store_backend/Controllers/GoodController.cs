using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GoodController : ControllerBase
{
    private readonly StoreDbContext _context; // משתנה שמחזיק את החיבור למסד הנתונים

    public GoodController(StoreDbContext context) // הזרקת ה-DbContext דרך ה-Constructor
    {
        _context = context;
    }
    // GET: api/<GoodController>
    [HttpGet("{name}")]
    async public Task<ActionResult<IEnumerable<Good>>> Get(string name)
    {
        var goods = await _context.Good.Where(g=>g.ProductName==name).ToListAsync();
        if (goods == null || goods.Count == 0) { return NotFound("you dont have goods"); }
        return Ok(goods);
    }

    // GET api/<GoodController>/5
    [HttpGet("{prod}/{sup}")]
    async public Task<ActionResult<Good>> Get(string prod, int sup)
    {
        var good = await _context.Good.Where(g=>g.ProductName== prod && g.SupplierID== sup).ToListAsync();
        if (good == null || good.Count == 0) { return NotFound("this supplier doesnt provide that good or there is no such good"); }
        return Ok(good);
    }

}
