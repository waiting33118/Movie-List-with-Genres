let status = 1

const data = {
  API_URL: 'https://movie-list.alphacamp.io/api/v1/',
  IMAGE_URL: 'https://movie-list.alphacamp.io/posters/',
  genres: {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  },
  moviesData: [],
  specificData: [],
}

const model = {
  getMoviesData() {
    axios
      .get(`${data.API_URL}/movies`)
      .then((res) => {
        data.moviesData.push(...res.data.results)
        view.showPage()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getSpecificData() {
    console.log(data.moviesData)
    data.specificData = data.moviesData.filter((data) => {
      return data.genres.includes(status)
    })
    console.log(data.specificData)
  }
}

const view = {
  renderListgroup() {
    Object.entries(data.genres).forEach(([key, value]) => {
      document.querySelector('.list-group').innerHTML += `
      <a href="javascript:;" class="list-group-item list-group-item-action" data-toggle="list" data-id="${key}">${value}</a>
      `
    })
    document.querySelector('.list-group').firstElementChild.classList.add('active')
  },
  showPage() {
    model.getSpecificData()
    let htmlContent = ''
    if (data.specificData.length === 0) {
      document.querySelector('#cards').innerHTML = `
      <div class="col-12 text-center">
        <h1>無此分類電影</h1>
      </div>
      `
    } else {
      data.specificData.forEach(movieData => {
        htmlContent += `
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${data.IMAGE_URL}${movieData.image}" class="card-img-top"
              alt="poster">
            <div class="card-body">
              <h5 class="card-text">${movieData.title}</h5>`
        movieData.genres.forEach(item => {
          htmlContent += `
          <span class="badge badge-pill badge-dark">${data.genres[item]}</span>
        `
        })
        htmlContent += `
            </div>
          </div>
        </div>
      `
        document.querySelector('#cards').innerHTML = htmlContent
      })
    }
  }
}

const controller = {
  pageInit() {
    model.getMoviesData()
    view.renderListgroup()
  }
}

controller.pageInit()
document.querySelector('.list-group').addEventListener('click', () => {
  // console.log(event.target.dataset.id)
  status = Number(event.target.dataset.id)
  view.showPage()
})