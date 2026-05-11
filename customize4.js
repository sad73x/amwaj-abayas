const basePrice = 450;

let selectedSize = "S";
let selectedColor = "Black";
let selectedFabric = "Chiffon";
let fabricPrice = 50;

const sizeButtons = document.querySelectorAll("#sizeBox .option-btn");
const colorButtons = document.querySelectorAll("#colorBox .option-btn");
const fabricItems = document.querySelectorAll("#fabricBox .fabric-item");
const summaryCard = document.querySelector(".summary-card");
const cartBtn = document.getElementById("cartBtn");
const abayaImage = document.getElementById("abayaImage");

const colorImages = {
    "Black": "abaya4.jpg",
    "Dark Blue": "abaya4d.jpg",
    "Light Blue": "abaya4l.jpg",
    "Beige": "abaya4b.jpg"
};

function updateSummary() {
    const total = basePrice + fabricPrice;

    summaryCard.innerHTML = `
        <h3>Price Summary</h3>

        <div class="summary-row">
            <span>Base Price:</span>
            <span>${basePrice} SAR</span>
        </div>

        <div class="summary-row">
            <span>Size:</span>
            <span>${selectedSize}</span>
        </div>

        <div class="summary-row">
            <span>Color:</span>
            <span>${selectedColor}</span>
        </div>

        <div class="summary-row">
            <span>Fabric (${selectedFabric}):</span>
            <span>+${fabricPrice} SAR</span>
        </div>

        <hr>

        <div class="summary-row total">
            <span>Total:</span>
            <span>${total} SAR</span>
        </div>
    `;

    cartBtn.textContent = `Add to Cart - ${total} SAR`;
}

sizeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        sizeButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        selectedSize = this.textContent;
        updateSummary();
    });
});

colorButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        colorButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        selectedColor = this.textContent;
        abayaImage.src = colorImages[selectedColor];
        updateSummary();
    });
});


fabricItems.forEach(item => {
    item.addEventListener("click", function () {
        fabricItems.forEach(f => f.classList.remove("active"));
        this.classList.add("active");

        selectedFabric = this.querySelector("span").textContent;

        if (selectedFabric === "Crepe") fabricPrice = 0;
        if (selectedFabric === "Chiffon") fabricPrice = 50;
        if (selectedFabric === "Nida") fabricPrice = 30;
        if (selectedFabric === "Silk") fabricPrice = 150;
        updateSummary();
    });
});

cartBtn.addEventListener("click", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
        name: "Customized Abaya",
        size: selectedSize,
        color: selectedColor,
        fabric: selectedFabric,
        total: basePrice + fabricPrice,
        quantity: 1,
        image: colorImages[selectedColor]
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(
        `Added to cart!\n\nSize: ${selectedSize}\nColor: ${selectedColor}\nFabric: ${selectedFabric}\nTotal: ${basePrice + fabricPrice} SAR`
    );

    window.location.href = "cart.html";

});

updateSummary();
