// Load existing data from localStorage
let outwardData = JSON.parse(localStorage.getItem("outwardData")) || [];

const outwardForm = document.getElementById("outwardForm");
const outwardTableBody = document.querySelector("#outwardTable tbody");
const grandTotalCell = document.getElementById("grandTotal");

// Render table
function renderTable() {
    outwardTableBody.innerHTML = "";
    let total = 0;

    outwardData.forEach((entry, index) => {
        const amount = entry.quantity * entry.rate;
        total += amount;

        outwardTableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${entry.product}</td>
        <td>${entry.quantity}</td>
        <td>${entry.rate}</td>
        <td>${amount}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteEntry(${index})">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      </tr>`;
    });

    grandTotalCell.textContent = total;
    localStorage.setItem("outwardData", JSON.stringify(outwardData));
}

// Add new outward entry
outwardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const product = document.getElementById("product").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const rate = parseFloat(document.getElementById("rate").value);

    if (product && quantity && rate) {
        outwardData.push({ product, quantity, rate });
        renderTable();
        outwardForm.reset();
    }
});

// Delete entry
function deleteEntry(index) {
    outwardData.splice(index, 1);
    renderTable();
}

// Initial render
renderTable();

// Handle new customer form
document.getElementById("customerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const customerName = document.getElementById("customerName").value.trim();
    if (customerName) {
        const customerDropdown = document.getElementById("customer");
        const newOption = document.createElement("option");
        newOption.value = customerName.toLowerCase().replace(/\s+/g, "-");
        newOption.textContent = customerName;
        customerDropdown.appendChild(newOption);
        customerDropdown.value = newOption.value;

        const modal = bootstrap.Modal.getInstance(document.getElementById("addCustomerModal"));
        modal.hide();
        e.target.reset();
    }
});

// Payment buttons behavior
document.addEventListener("DOMContentLoaded", () => {
    const paymentButtons = document.querySelectorAll(".payment-btn");
    const customerSection = document.getElementById("customerSection");
    const customerSelect = document.getElementById("customer");

    paymentButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            paymentButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const paymentType = btn.dataset.payment;
            if (paymentType === "cash") {
                customerSection.classList.remove("d-none");
                customerSelect.setAttribute("required", "");
            } else {
                customerSection.classList.add("d-none");
                customerSelect.removeAttribute("required");
                customerSelect.value = "";
            }
        });
    });
});
