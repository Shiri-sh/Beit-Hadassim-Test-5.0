namespace Store_backend.Classes;

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Supplier
{
    [Key]
    public int ID { get; set; }
    public string AgentName { get; set; }
    public string CompanyName { get; set; }
    public string NumberPhone { get; set; }

    public List<Good> Goods { get; set; }
}

public class OrderType
{
    [Key]
    public int ID { get; set; }
    public string ProductName { get; set; }
    public int SumP { get; set; }
    public string OStatus { get; set; }
    [ForeignKey("Supplier")]
    public int SupplierID { get; set; }

    public Supplier Supplier { get; set; }

}

public class Good
{
    [Key]
    public int ID { get; set; }
    public string ProductName { get; set; }
    [Precision(18, 2)]
    public decimal PricePerItem { get; set; }
    public int MinimumQuantityForOrder { get; set; }
    [ForeignKey("Supplier")]
    public int SupplierID { get; set; }
}