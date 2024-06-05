import { getData } from "../api/getData";

// Находим в зависимости от страницы контейнер для фильмов или сериалов
const movieDetails = document.querySelector("#movie-details");
const tvDetails = document.querySelector("#tv-details");

// Получаем id из URL
const id = new URL(window.location.href).searchParams.get("id");

// Проверяем на какой мы странице (фильмы или сериалы)
const pathname = new URL(window.location.href).pathname;

// Переменная для endpoint
let data = "";

// Проверка на какой мы странице
if (pathname === "/movie-details.html") {
  data = `movie/${id}`; // Если на странице фильма, то записываем в data endpoint для получения информации об фильме
} else {
  data = `tv/${id}`; // Иначе получаем информацию об сериале
}

// Функцтя для отрисовки карточки на странице
export const detailTemplates = async () => {
  const { title, poster_path, overview, vote_average } = await getData(data);
  const div = document.createElement("div");

  div.classList.add("details-card");

  div.innerHTML = `
        <div class="card-image">
            <img src="https://www.themoviedb.org/t/p/w300${poster_path}" alt="${title}" />
            <div class="card-info">
                <div class="details-information">
                    <div class="information-description">
                        <h3 class="description-title">${title}</h3>
                        <p class="description-subtitle">${overview}</p>
                        <p class="details-rating">
                            <div class="rarint-img"></div>
                            ${vote_average}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Проверка чтобы отрисовать карточку в нужном контейнере
  if (movieDetails) {
    movieDetails.appendChild(div);
  } else {
    tvDetails.appendChild(div);
  }
};

// Вызов функции
detailTemplates(id);
