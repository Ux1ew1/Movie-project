import { getData } from "./getData.js";
import { global } from "../global.js";
import { cardsSearchTemplate } from "../utils/generateTemplate";
import { smoothscroll } from "../components/smothScroll";

/**
 * Выполняет запрос к API для поиска данных.
 * Использует глобальные параметры для определения типа поиска, термина поиска и номера страницы.
 * Отображает спиннер во время выполнения запроса и скрывает его после получения данных.
 *
 * @returns {Promise<Object>} Возвращает промис с результатами поиска в формате JSON.
 * @throws {Error} Бросает ошибку в случае неудачного запроса или проблем с сетью.
 */
export const searchData = async () => {
  const endpoint = `search/${global.search.type}?query=${global.search.term}&page=${global.search.page}`;
  return getData(endpoint);
};

/**
 * Выполняет поиск по введенным параметрам и отображает результаты.
 * Извлекает параметры поиска из строки запроса URL, устанавливает глобальные параметры поиска и вызывает функцию поиска API.
 * Если результаты поиска не пустые, отображает их и очищает поле ввода.
 */
export const search = async () => {
  // Передаём в term информацию о том что ищем из URL
  global.search.term = new URL(window.location.href).searchParams.get(
    "search-term"
  );
  // Передаём в type тип поиска
  global.search.type = new URL(window.location.href).searchParams.get("type");

  // Получаем данные из endpoint
  const data = await searchData();
  // Передаём данные о страницах в global
  global.search.totalPages = data.total_pages;
  // Передаём информацию о результатах поиска
  global.search.totalResults = data.total_results;
  // Деструктурируем данные из data
  const { results } = data;
  // Вызываем функцию для отрисовки карточек на странице поиска и передаём в неё данные из result
  console.log(results);
  displaySearchResults(results);
};

/**
 * Отображает результаты поиска.
 * @param {Array} results - Массив объектов с результатами поиска.
 */
export const displaySearchResults = (results) => {
  // Вызываем функцию для отрисовки карточек и передаём в неё resault
  cardsSearchTemplate(results, "#search-results");
  displayPagination();
};

/**
 * Отображает пагинацию для результатов поиска.
 */
export const displayPagination = () => {
  document.querySelector("#pagination").innerHTML = "";
  const div = document.createElement("div");

  div.classList.add("pagination");

  div.innerHTML = `
      <div>
        <button class="btn btn-outline" id="prev">Prev</button>
        <button class="btn btn-outline" id="next">Next</button>
      </div>
      <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `;

  document.querySelector("#pagination").appendChild(div);

  // Отключаем кнопку "Назад", если находимся на первой странице
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  // Отключаем кнопку "Вперед", если находимся на последней странице
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  // Обработчик события для перехода на следующую страницу
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;

    // Получаем результаты поиска для новой страницы
    const { results } = await searchData();
    displaySearchResults(results);
    smoothscroll();
    // Отображаем результаты поиска для новой страницы
    // Плавная прокрутка к началу страницы
  });

  // Обработчик события для перехода на предыдущую страницу
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;

    // Получаем результаты поиска для новой страницы
    const { results } = await searchData();
    displaySearchResults(results);
    smoothscroll();

    // Отображаем результаты поиска для новой страницы
    // Плавная прокрутка к началу страницы
  });
};
