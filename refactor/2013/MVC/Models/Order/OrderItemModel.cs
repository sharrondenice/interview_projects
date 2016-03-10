namespace MVC.Models.Order
{
    public class OrderItemModel
    {
        public int quantity { get; set; }
        public decimal price { get; set; }
        public string description { get; set; }
        public long id { get; set; }
    }
}