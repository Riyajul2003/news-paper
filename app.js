const API_KEY = "50070391667d4b02885d853b5ba04908";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));



async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardcontainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('template-card');

    cardcontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        filldataincard(cardclone,article);
        cardcontainer.appendChild(cardclone);
    });
}

function filldataincard(cardclone,article){
    const newsimg = cardclone.querySelector('#news-img')
    const newstitle = cardclone.querySelector('#news-title')
    const newsource = cardclone.querySelector('#news-source')
    const newsdese = cardclone.querySelector('#news-desc')

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdese.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"asia/jakarta"
    });

    newsource.innerHTML = `${article.source.name} .${date}`;


    cardclone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url,"_blank");
    })
}

 let curselectdnav = null;
function onNavItemClick(id) {
    fetchNews(id)
    const navitem = document.getElementById(id);
    curselectdnav?.classList.remove('active');
    curselectdnav = navitem;
    curselectdnav.classList.add('active');
}

const searchtext = document.getElementById('search-text');
const searchbutton = document.getElementById('search-button');

searchbutton.addEventListener('click',() =>{
    const query = searchtext.value;
    if(!query) result;
    fetchNews(query)
    curselectdnav?.classList.remove('active');
    curselectdnav = null;
})