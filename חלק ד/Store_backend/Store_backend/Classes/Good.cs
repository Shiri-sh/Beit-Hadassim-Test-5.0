using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Store_backend.Classes;

public class Good
{
    [Key]
    public int ID { get; set; }
    [ForeignKey("Product")]
    public int ProductID { get; set; }
    [JsonIgnore]
    public Product? Product { get; set; }

    [Precision(18, 2)]
    public decimal PricePerItem { get; set; }
    public int MinimumQuantityForOrder { get; set; }
    public int SupplierID { get; set; }

    [ForeignKey("SupplierID")]
    [JsonIgnore]
    public Supplier? Supplier { get; set; }


}
