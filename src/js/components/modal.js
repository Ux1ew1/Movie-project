import { getData } from "../api/getData";

// Находим модальное окно на странице
const modal = document.querySelector("#modal");

// Переменная для endpoint
let data;

// Функция показа модального окна и отрисовки в нём информации
export const showModalInfo = async (id, cardClassName) => {
  // Получаем информацию о том какая вкладка открыта (фильмы или сериалы)
  const tabActiveDataset =
    document.querySelector(".tabs__btn--active")?.dataset?.tabsPath ?? "N/A";

  // Получение нужного endpoint
  switch (tabActiveDataset) {
    case "movies":
      data = `movie/${id}`; // Если в табах выбрана вкладка с фильмами, то записываем в переменную endpoint для получения информации об фильме
      break;
    case "shows":
      data = cardClassName === "list-item-link" ? `tv/${id}` : `movie/${id}`; // Если выбрана вкладка с сериалами, то передаём endpoint для получения информации об сериале. Но если клик был по фильму из слайдера, то передаём endpoint для получения информации об фильме.
      break;
    default:
      data = `movie/${id}`; // По умолчанию передаём endpoint для фильмов
      break;
  }

  // Деструктурируем полученные данные
  const { title, poster_path, overview, vote_average, name } = await getData(
    data
  );
  const result = await getData(data);

  // Рисуем шаблон с информацией для модального окна
  const template = `
      <button id="close-button">Закрыть</button>
        <div class="card-image">
          <img src="https://www.themoviedb.org/t/p/w300${poster_path}" alt="${title}" />
            <div class="card-info">
              <div class="details-information">
                <div class="information-description">
                <h3 class="description-title">${title ?? name}</h3>
                <p class="description-subtitle">${overview ?? "N/A"}</p>
                <p class="details-rating">
              <div class="rarint-img"></div>
              ${vote_average}
              </p>
            </div>
          </div>
        </div>
      </div>
  `;

  // вставляем шаблон в модальное окно
  modal.innerHTML = template;

  // Функция для закрытия модального окна
  document.addEventListener("click", () => {
    if (modal.open) {
      modal.close();
    }
  });
  modal.showModal(); // Открытие модального окна
};
