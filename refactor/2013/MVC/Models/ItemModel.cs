using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC.Models
{
	/// <summary>
	/// Item model.
	/// </summary>
    public class ItemModel
    {
        public long id { get; set; }
        public string description { get; set; }
        public double price { get; set; }
    }

	/// <summary>
	/// Item.
	/// </summary>
    public abstract class Item
    {
		/// <summary>
		/// Loads the items.
		/// </summary>
		/// <returns>The items.</returns>
        public static List<ItemModel> LoadItems()
        {
            List<ItemModel> itemList = new List<ItemModel>();

            itemList.Add(new ItemModel
            {
                description = "Red Stapler",
                price = 50,
                id = 1,

            });
            itemList.Add(new ItemModel
            {
                description = "TPS Report",
                price = 3,
                id = 2,

            });
            itemList.Add(new ItemModel
            {
                description = "Printer",
                price = 400,
                id = 3,
            });
            itemList.Add(new ItemModel
            {
                description = "Baseball bat",
                price = 80,
                id = 4,

            });
            itemList.Add(new ItemModel
            {
                description = "Michael Bolton CD",
                price = 12,
                id = 5,
            });
            itemList.Add(new ItemModel
            {
                description = "Jump to Conclusions Mat",
                price = 0.01,
                id = 6,
            });

            return itemList;
        }
    }
}