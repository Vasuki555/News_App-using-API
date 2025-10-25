const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const newsContainer = document.getElementById("news-container");
const categoryButtons = document.querySelectorAll(".category-btn");

const API_KEY = "7e7880242c7c495ab68f017b1df438e4"; // Replace with your NewsAPI key
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us";

// Fetch news based on category or search query
const fetchNews = async (query, category = "") => {
    let url = `${BASE_URL}&apiKey=${API_KEY}`;
    
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    } else if (category) {
        url = `${BASE_URL}&category=${category}&apiKey=${API_KEY}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
};

// Display news articles
const displayNews = (articles) => {
    newsContainer.innerHTML = "";
    if (!articles.length) {
        newsContainer.innerHTML = "<p>No news found. Try a different keyword or category!</p>";
        return;
    }

    articles.forEach((article) => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");
        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsCard);
    });
};

// Search news on button click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchNews(query);
});

// Fetch news by category
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        fetchNews("", category);
    });
});

// Load top headlines on page load
window.onload = () => {
    fetchNews();
};
