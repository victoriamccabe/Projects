using System;
using System.ComponentModel.DataAnnotations;

namespace YourProjectName.Areas.Rental.Models
{

    // Rental History Model
    public class RentalHistory
    {
        [Key] // Primary Key
        public int RentalHistoryId { get; set; }

        [Display(Name = "Rental Damage")] // Shows the label "Rental Damage" in the UI
        public bool RentalDamaged { get; set; }

        [Display(Name = "Damage Incurred")] // Shows the label "Damage Incurred" in the UI
        public string DamagesIncurred { get; set; }

        public string Rental { get; set; }
       
    }
}