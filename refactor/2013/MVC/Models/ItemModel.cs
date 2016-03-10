using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC.Models
{
    public class ItemModel
    {
        public long id { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
    }

    public class Item
    {
        public static List<ItemModel> LoadItems()
        {
            List<ItemModel> _itemList = new List<ItemModel>();

            _itemList.Add(new ItemModel
            {
                description = "Red Stapler",
                price = 50,
                id = 1,

            });
            _itemList.Add(new ItemModel
            {
                description = "TPS Report",
                price = 3,
                id = 2,

            });
            _itemList.Add(new ItemModel
            {
                description = "Printer",
                price = 400,
                id = 3,
            });
            _itemList.Add(new ItemModel
            {
                description = "Baseball bat",
                price = 80,
                id = 4,

            });
            _itemList.Add(new ItemModel
            {
                description = "Michael Bolton CD",
                price = 12,
                id = 5,
            });

            return _itemList;
        }
    }
}