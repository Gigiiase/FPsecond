
// const productSection = document.getElementById('card_section');
// const backButton = document.getElementById('back_button');
// const nextButton = document.getElementById('next_button');
// const perPage = document.getElementById('cards-per-page');
// const searchInput = document.querySelector('input[name="search"]');

// let limit = 9;
// let skip = 0;
// let totalProducts = 0;

// const fetchProducts = () => {
//     showPlaceholder(limit);
//     fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
//         .then(response => response.json())
//         .then(data => {
//             totalProducts = data.total;
//             renderProducts(data.products);
//             updateButtonStates();
//         })
//         .catch(error => console.error('Error fetching products:', error));
// };

// const renderProducts = (products) => {
//     productSection.innerHTML = '';
//     if (!products.length) {
//         productSection.innerHTML = `<p>No products found</p>`;
//         return;
//     }
//     products.forEach(product => {
//         const div = document.createElement('div');
//         div.className = 'product_card';
//         div.innerHTML = `
//             <article class="section_2_article_first">
//                 <img src="${product.thumbnail}" alt="${product.title}" class="section_2_article_photo">
//                 <p class="section_2_article_title">${product.title}</p>
//                 <article class="section_2_article_first_article">
//                     <p class="money">$${product.price}</p>
//                     <button class="add_button">ADD</button>
//                 </article>
//             </article>
//         `;
//         productSection.appendChild(div);
//     });
// };

// const updateButtonStates = () => {
//     backButton.disabled = skip === 0;
//     nextButton.disabled = skip + limit >= totalProducts;
// };

// const handleSearch = () => {
//     const query = searchInput.value.trim();
//     if (!query) {
//         skip = 0;
//         fetchProducts();
//     } else {
//         showPlaceholder(limit);
//         fetch(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`)
//             .then(response => response.json())
//             .then(data => {
//                 renderProducts(data.products);
//                 totalProducts = data.total;
//                 updateButtonStates();
//             })
//             .catch(error => console.error('Error searching products:', error));
//             productSection.innerHTML = `<p>Error searching products. Please try again later.</p>`;
//     }
// };

// const debounce = (fn, delay) => {
//     let timeoutId;
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => fn(...args), delay);
//     };
// };

// searchInput.addEventListener('input', debounce(handleSearch, 300));

// nextButton.addEventListener('click', () => {
//     if (skip + limit < totalProducts) {
//         skip += limit;
//         fetchProducts();
//     }
// });

// backButton.addEventListener('click', () => {
//     if (skip >= limit) {
//         skip -= limit;
//         fetchProducts();
//     }
// });

// perPage.addEventListener('change', (event) => {
//     limit = parseInt(event.target.value, 10);
//     skip = 0;
//     fetchProducts();
// });

// function showPlaceholder(count) {
//     productSection.innerHTML = '';
//     for(let i = 0; i < count; i++) {
//         const placeHolderDiv = document.createElement('div');
//         placeHolderDiv.classList.add('product-placeholder');
//         placeHolderDiv.innerHTML = (`
//             <div class=" card h-100" aria-hidden="true">
//             <img src="" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title placeholder-glow">
//                 <span class="placeholder col-6"></span>
//                 </h5>
//                 <p class="card-text placeholder-glow">
//                 <span class="placeholder col-7"></span>
//                 <span class="placeholder col-4"></span>
//                 <span class="placeholder col-4"></span>
//                 <span class="placeholder col-6"></span>
//                 <span class="placeholder col-8"></span>
//                 </p>
//                 <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
//             </div>
//         </div>`);
//     }
//     productSection.appendChild(placeHolderDiv)
// }

// fetchProducts();







const productSection = document.getElementById('card_section');
const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');
const perPage = document.getElementById('cards-per-page');
const searchInput = document.querySelector('input[name="search"]');

let limit = 9;
let skip = 0;
let totalProducts = 0;

const fetchProducts = () => {

    showPlaceholder(limit);

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(response => response.json())
        .then(data => {
            totalProducts = data.total;
            renderProducts(data.products);
            updateButtonStates();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productSection.innerHTML = `<p>Error loading products. Please try again later.</p>`;
        });
};

const renderProducts = (products) => {
    productSection.innerHTML = '';
    if (!products.length) {
        productSection.innerHTML = `<p>No products found</p>`;
        return;
    }
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product_card';
        div.innerHTML = `
            <article class="section_2_article_first">
                <img src="${product.thumbnail}" alt="${product.title}" class="section_2_article_photo">
                <p class="section_2_article_title">${product.title}</p>
                <article class="section_2_article_first_article">
                    <p class="money">$${product.price}</p>
                    <button class="add_button">ADD</button>
                </article>
            </article>
        `;
        productSection.appendChild(div);
    });
};

const updateButtonStates = () => {
    backButton.disabled = skip === 0;
    nextButton.disabled = skip + limit >= totalProducts;
};

const handleSearch = () => {
    const query = searchInput.value.trim();
    if (!query) {
        skip = 0;
        fetchProducts();
    } else {
        showPlaceholder(limit);
        fetch(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`)
            .then(response => response.json())
            .then(data => {
                renderProducts(data.products);
                totalProducts = data.total;
                updateButtonStates();
            })
            .catch(error => {
                console.error('Error searching products:', error);
                productSection.innerHTML = `<p>Error searching products. Please try again later.</p>`;
            });
    }
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

searchInput.addEventListener('input', debounce(handleSearch, 300));

nextButton.addEventListener('click', () => {
    if (skip + limit < totalProducts) {
        skip += limit;
        fetchProducts();
        productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

backButton.addEventListener('click', () => {
    if (skip >= limit) {
        skip -= limit;
        fetchProducts();
        productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

perPage.addEventListener('change', (event) => {
    limit = parseInt(event.target.value, 10);
    skip = 0;
    fetchProducts();
});

function showPlaceholder(count) {
    productSection.innerHTML = ''; // Clear existing content
    for (let i = 0; i < count; i++) {
        const placeHolderDiv = document.createElement('div');
        placeHolderDiv.classList.add('product-placeholder');
        placeHolderDiv.innerHTML = `
            <div class="card h-100" aria-hidden="true">
                <img src="" class="card-img-top placeholder-img" alt="Placeholder image">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                    <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>`;
        productSection.appendChild(placeHolderDiv);
    }
}

// Initial fetch
fetchProducts();





function compresedText(text) {
let count = 1;
let letter = text[0];
let compresedString = "";

for(let i = 1; i < letter.length; i++){
    while(letter === text[i]) {
        i++;
        count++;
    }
    compresedString += `${count} ${letter}`;
    letter = text[i];
    count = 1;
    if (i === text.length - 1) {
    compresedString += `${count} ${letter}`;
    }
}
}
console.log(compresedText("aaabbccc"));




