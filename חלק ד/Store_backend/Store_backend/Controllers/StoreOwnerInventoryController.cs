using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StoreOwnerInventoryController : ControllerBase
{
    private readonly StoreDbContext _context; 

    public StoreOwnerInventoryController(StoreDbContext context) 
    {
        _context = context;
    }
    // GET: api/<StoreOwnerInventoryController>
    [HttpGet]
    //return the name and id of each merchendise in the inventory
    async public Task<ActionResult<IEnumerable<Good>>> Get()
    {
        var inentory = await _context.StoreOwnerInventory
            .Include(i=>i.Product)
            .Select(i => new {
                i.ID,
                i.Product.ProductName
            })
            .ToListAsync();
        if (inentory == null || inentory.Count == 0) { return NotFound("you dont have inentory"); }
        return Ok(inentory);
    }

    // PUT api/<StoreOwnerInventoryController>/5
    [HttpPut]
    //update the inventory . if there is lack of some product the system creates new order
    public async Task<IActionResult> Put([FromBody] Dictionary<int, int> soldItems)
    {

        foreach (var item in soldItems)
        {
            int productId = item.Key;
            int quantitySold = item.Value;


            var inventoryItem = await _context.StoreOwnerInventory
                .FirstOrDefaultAsync(i => i.ProductId == productId);

            // update the current quantity
            inventoryItem.CurrentQuantity -= quantitySold;

            // if its bellow the minimum we create new order
            if (inventoryItem.CurrentQuantity < inventoryItem.DesiredQuantity)
            {
                //bring the chipest good
                var good = await _context.Good
                    .Where(g => g.ProductID == productId)
                    .OrderBy(g => g.PricePerItem)
                    .FirstOrDefaultAsync();

                if (good != null)
                {
                    var newOrder = new OrderType
                    {
                        ProductID = productId,
                        SumP = inventoryItem.DesiredQuantity - inventoryItem.CurrentQuantity,
                        OStatus = "Open",
                        SupplierID = good.SupplierID
                    };

                    await _context.OrderType.AddAsync(newOrder);
                }
                else
                {
                    return NotFound("no supplier provide this product");
                }
            }
            _context.StoreOwnerInventory.Update(inventoryItem);
        }

        await _context.SaveChangesAsync();
        return Ok("Inventory updated and orders placed if needed.");
    }
}
