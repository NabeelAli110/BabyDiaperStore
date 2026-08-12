/* ==========================================================================
   Project: Memon Diaper & Baby Care - Master JavaScript Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Global Modals
  const orderModal = document.getElementById("orderModal");
  const dealsModal = document.getElementById("dealsModal");

  // Buttons
  const closeOrderBtn = document.getElementById("closeOrderModal");
  const closeDealsBtn = document.getElementById("closeDealsModal");
  const openDealsNavBtn = document.getElementById("openDealsNav");

  // Form Fields
  const orderProductSelect = document.getElementById("orderProductSelect");
  const diaperSizeGroup = document.getElementById("diaperSizeGroup");

  // Open Special Deals Modal
  if (openDealsNavBtn) {
    openDealsNavBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dealsModal.classList.add("active");
    });
  }

  // Close Modals
  if (closeOrderBtn) {
    closeOrderBtn.addEventListener("click", () => {
      orderModal.classList.remove("active");
    });
  }

  if (closeDealsBtn) {
    closeDealsBtn.addEventListener("click", () => {
      dealsModal.classList.remove("active");
    });
  }

  // Close on Outside Overlay Click
  window.addEventListener("click", (e) => {
    if (e.target === orderModal) orderModal.classList.remove("active");
    if (e.target === dealsModal) dealsModal.classList.remove("active");
  });

  // Dynamic Diaper Size Field Toggle
  if (orderProductSelect) {
    orderProductSelect.addEventListener("change", (e) => {
      const selectedValue = e.target.value.toLowerCase();
      if (selectedValue.includes("diaper") || selectedValue.includes("pant")) {
        diaperSizeGroup.style.display = "block";
      } else {
        diaperSizeGroup.style.display = "none";
      }
    });
  }

  // Universal Buy Now Trigger (Attached to all Buy Now Buttons)
  document.body.addEventListener("click", (e) => {
    const buyBtn = e.target.closest(".trigger-buy-now");
    if (buyBtn) {
      const productName = buyBtn.getAttribute("data-product");
      
      // Auto Fill Product/Deal Dropdown inside Order Form
      if (orderProductSelect && productName) {
        orderProductSelect.value = productName;
        
        // Trigger Change Event for Diaper Size Visibility
        const event = new Event("change");
        orderProductSelect.dispatchEvent(event);
      }

      // Hide Deals Modal if open & Open Order Form
      dealsModal.classList.remove("active");
      orderModal.classList.add("active");
    }
  });

  // Handle WhatsApp Order Submit
  const whatsappOrderForm = document.getElementById("whatsappOrderForm");
  if (whatsappOrderForm) {
    whatsappOrderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("custName").value;
      const phone = document.getElementById("custPhone").value;
      const address = document.getElementById("custAddress").value;
      const product = document.getElementById("orderProductSelect").value;
      const brand = document.getElementById("brandSelect").value;
      const size = document.getElementById("diaperSizeSelect").value;
      const quantity = document.getElementById("orderQuantity").value;
      const notes = document.getElementById("orderNotes").value;

      // WhatsApp Target Number
      const whatsappNumber = "923012483393";

      // Formatted WhatsApp Message
      let message = `*NEW WHOLESALE ORDER - MEMON DIAPER STORE*\n\n`;
      message += `👤 *Customer Name:* ${name}\n`;
      message += `📞 *Phone:* ${phone}\n`;
      message += `📍 *Address:* ${address}\n\n`;
      message += `🛍️ *Product/Deal:* ${product}\n`;
      message += `🏷️ *Preferred Brand:* ${brand}\n`;
      
      if (diaperSizeGroup.style.display !== "none" && size) {
        message += `📐 *Diaper Size:* ${size}\n`;
      }
      
      message += `📦 *Quantity:* ${quantity}\n`;
      if (notes) message += `📝 *Notes/Requirements:* ${notes}\n`;

      // Open WhatsApp Link
      const encodedMsg = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
      
      window.open(whatsappURL, "_blank");
      orderModal.classList.remove("active");
      whatsappOrderForm.reset();
    });
  }
});