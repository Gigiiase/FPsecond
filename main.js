const productSection = document.getElementById('card_section');
const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');
const perPage = document.getElementById('cards-per-page');

let limit = 9;
let skip = 0;

document.querySelector('input[name="search"]').addEventListener('keyup', (Event) => {
    // console.log(Event.target.value);
    fetch(`https://dummyjson.com/products/search?q=${Event.target.value}&limit=10&sortBy=title`)
    .then(res => res.json())
    .then(console.log);
    
})



function fetchproducts() {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    .then(response => response.json())
    .then(data => {
        productSection.innerHTML = ''; 
    data.products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product_card'
    div.innerHTML = `
            <article class="section_2_article_first">
            <img src="${product.thumbnail}" alt="${product.title}" class="section_2_article_photo">

            <p class="section_2_article_title">${product.title}
            </p>
            <article class="section_2_article_first_article">
                <p class="money">${product.price}
                </p>
                <button class="add_button">ADD</button>
            </article>
        </article>
        `;
        productSection.appendChild(div);
});
    backButton.disabled = skip === 0;
    nextButton.disabled = limit === data.total;
    })
    .catch(error => console.error('Error fetching products:', error));
}
nextButton.addEventListener('click', () => {
    skip += limit;
    fetchproducts();
});
backButton.addEventListener('click', () => {
    if(skip >= limit) {
        skip -= limit;
        fetchproducts();
    }
});
perPage.addEventListener('change', (Event) => {
    limit =parseInt(Event.target.value, 10);
    skip = 0;
    fetchproducts();
})
fetchproducts();