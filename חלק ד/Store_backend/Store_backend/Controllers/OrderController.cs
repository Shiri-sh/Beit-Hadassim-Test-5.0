using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;


[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly StoreDbContext _context;

    public OrderController(StoreDbContext context) 
    {
        _context = context;
    }

    // GET: api/<OrderController>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderType>>> Get()
    {
        var orders = await _context.OrderType
                        .Include(o => o.Supplier)
                        .Select(o => new {
                            o.ID,
                            o.Product.ProductName,
                            o.SumP,
                            o.OStatus,
                            SupplierCompanyName = o.Supplier.CompanyName
                        })
                        .ToListAsync();

        if (orders == null || orders.Count == 0)
        {
            return NotFound("You don't have orders.");
        }

        return Ok(orders);
    }

    // GET api/<OrderController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<OrderType>>>  Get(int id)
    {
        var orders=await _context.OrderType.Where(o=>o.SupplierID==id).ToListAsync();
        if(orders==null||orders.Count()==0) { return NotFound("you dont have orders");}
        return Ok(orders);
    }

    //POST api/<OrderController>
    [HttpPost]
    //add order
    public IActionResult Post([FromBody] OrderType o)
    {
        if (o == null)
        {
            return BadRequest("Invalid order data.");
        }

        try
        {
            _context.OrderType.Add(o);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Post), new { id = o.ID }, o);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT api/<OrderController>
    [HttpPut("{id}")]
    //update the status of the order
    public async Task<IActionResult> Put(int id,[FromBody] string newStatus)
    {
        var order = await _context.OrderType.FindAsync(id);
        if (order == null)
        {
            return NotFound("Order not found");
        }

        order.OStatus = newStatus;

        await _context.SaveChangesAsync();
        return Ok("Order status updated");
    }
}
