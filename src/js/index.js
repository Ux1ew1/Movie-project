import { global } from "./global.js";
import {
  cardsTemplate,
  cardsTemplateWithSlider,
} from "./utils/generateTemplate";
import { tabsComponent } from "./components/tabs";
import { search } from "./api/searchServices";

/**
 * Инициализирует функции в зависимости от страницы.
 */
function init() {
  switch (global.currentPage) {
    // Если текущая страница корневая или index.html
    case "/":
    case "/index.html":
      // Вызываем функции для отображения фильмов в прокате (слайдер), а также популярных фильмов и сериалов
      cardsTemplateWithSlider("movie", "movie/now_playing");

      cardsTemplate("movie/popular", ".popular-movies", "movie");
      cardsTemplate("tv/popular", ".popular-tv", "tv");

      tabsComponent();
      break;
    case "/movie-details.html":
      break;
    case "/tv-details.html":
      // Вызываем функцию для отображения деталей о сериале
      break;
    case "/search.html":
      search();
      // Вызываем функцию для выполнения поиска
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
