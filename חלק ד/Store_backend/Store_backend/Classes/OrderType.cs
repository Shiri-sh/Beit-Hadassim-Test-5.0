using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Store_backend.Classes;

public class OrderType
{
    [Key]
    public int ID { get; set; }
    [ForeignKey("Product")]
    public int ProductID { get; set; }
    [JsonIgnore]
    public Product? Product { get; set; }
    public int SumP { get; set; }
    public string OStatus { get; set; }
    [ForeignKey("Supplier")]
    public int SupplierID { get; set; }
    [JsonIgnore]
    public Supplier? Supplier { get; set; }

}
