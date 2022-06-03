let news = []
let menus = document.querySelectorAll('.menus button');
let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');

menus.forEach((menu)=> menu.addEventListener('click', (event)=> getNewsByTopic(event) ));
const getLatestNews = async() => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({'x-api-key':'c-_Snb7HuqGvGD9cjBAl5Yn1_hEx-rIo0mjZCUTJIBA'})

    let response = await fetch(url,{headers:header}); //ajax, http, fetch, await = 실행될때까지 기다려줌 (아래코드 실행 안되게)
    let data = await response.json();
    news = data.articles;
    console.log(news)

    render();
}

const getNewsByKeyword = async() => {
    console.log('버튼 클릭됨!');
    let keyword = searchInput.value;
    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10&countries=KR`);

    let header = new Headers({'x-api-key':'c-_Snb7HuqGvGD9cjBAl5Yn1_hEx-rIo0mjZCUTJIBA'});

    let response = await fetch(url,{headers:header}); //ajax, http, fetch, await = 실행될때까지 기다려줌 (아래코드 실행 안되게)
    let data = await response.json();
    news = data.articles;
    render();
}


const render = () => {
    let newsHTML = ''
    newsHTML = news.map(news=>{
        return `<div class="row news">
            <div class="col-lg-4">
                <img class="img-size" src="${news.media}"/>
            </div>
            <div class="col-lg-8">
                <h2>
                    ${news.title}
                </h2>
                <p>${news.excerpt}</p>
                <div>
                    ${news.rights} * ${news.published_date}
                </div>
            </div>
        </div>`
    }).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

let getNewsByTopic = async(event) => {
    console.log('클릭됨', event.target.textContent);
    
    let topic = event.target.textContent.toLowerCase() ;
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);

    let header = new Headers({'x-api-key':'c-_Snb7HuqGvGD9cjBAl5Yn1_hEx-rIo0mjZCUTJIBA'});

    let response = await fetch(url,{headers:header}); //ajax, http, fetch, await = 실행될때까지 기다려줌 (아래코드 실행 안되게)
    let data = await response.json();
    news = data.articles;
    render();
};



searchBtn.addEventListener('click', getNewsByKeyword);
getLatestNews();
