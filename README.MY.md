🎓 Розбір коду галереї зображень 📁 Файл: main.js (головний файл - мозок нашого
додатку) 🔗 Імпорти - підключаємо помічників

javascriptimport iziToast from 'izitoast'; import
'izitoast/dist/css/iziToast.min.css'; Що це означає?

Ми підключаємо бібліотеку iziToast - це як маленький помічник, який показує
красиві повідомлення (наприклад: "Помилка!", "Увага!", "Успіх!") Також
підключаємо стилі CSS для цих повідомлень, щоб вони виглядали гарно

javascriptimport { getImagesByQuery } from './js/pixabay-api.js'; import {
createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton,
hideLoadMoreButton, appendGallery, } from './js/render-functions.js'; Що це
означає?

Ми підключаємо функції з інших файлів:

getImagesByQuery - функція, яка йде в інтернет і шукає фотографії
createGallery - функція, яка створює галерею з фотографіями clearGallery -
функція, яка очищає галерею showLoader/hideLoader - функції, які
показують/ховають анімацію завантаження showLoadMoreButton/hideLoadMoreButton -
показують/ховають кнопку "Завантажити більше" appendGallery - додає нові
фотографії до існуючої галереї

🔍 Знаходимо елементи на сторінці javascriptconst formEl =
document.querySelector('.form'); const loadMoreBtnEl =
document.querySelector('.load-more-btn'); Що це означає?

formEl - ми знаходимо на сторінці форму (там, де користувач вводить, що шукати)
loadMoreBtnEl - знаходимо кнопку "Завантажити більше" document.querySelector() -
це як пошук: "Знайди мені елемент з таким класом"

📊 Змінні для зберігання стану javascriptlet currentQuery = ''; let currentPage
= 1; const perPage = 15; Що це означає?

currentQuery - тут зберігаємо, що користувач шукає (наприклад: "коти")
currentPage - на якій сторінці ми зараз (початок - 1) perPage - скільки
фотографій показуємо за раз (15 штук)

👂 Слухачі подій - реагуємо на дії користувача
javascriptformEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore); Що це означає?

Коли користувач натискає "Пошук" в формі → запускається функція onFormSubmit
Коли користувач натискає кнопку "Завантажити більше" → запускається функція
onLoadMore addEventListener - це як сказати: "Коли станеться ця подія, зроби це"

🔍 Функція onFormSubmit - що відбувається при пошуку javascriptasync function
onFormSubmit(event) { event.preventDefault(); Пояснення:

async - ця функція може чекати на результати (наприклад, поки завантажаться
фото) event.preventDefault() - не дозволяємо сторінці перезавантажитись при
натисканні кнопки

javascriptconst inputQuery =
event.currentTarget.elements['search-text'].value.trim(); Що це означає?

Берем текст, який користувач ввів у поле пошуку .trim() - прибираємо зайві
пробіли на початку та в кінці

javascriptif (!inputQuery) { iziToast.warning({ title: 'Warning', message:
'please enter a search query', }); formEl.reset(); return; } Що відбувається?

Якщо користувач нічого не ввів → показуємо жовте попередження formEl.reset() -
очищаємо форму return - виходимо з функції (нічого більше не робимо)

javascriptcurrentQuery = inputQuery; currentPage = 1; Пояснення:

Зберігаємо те, що шукає користувач Починаємо з 1-ї сторінки (новий пошук)

javascriptclearGallery(); hideLoadMoreButton(); showLoader(); Що робимо?

Очищаємо стару галерею Ховаємо кнопку "Завантажити більше" Показуємо анімацію
завантаження (спіннер)

javascripttry { const data = await getImagesByQuery(currentQuery, currentPage);
Пояснення:

try - спробуємо зробити щось, що може не вдатися await - чекаємо, поки функція
принесе фотографії з інтернету data - тут будуть наші фотографії

javascriptif (!data || !data.hits || !Array.isArray(data.hits)) {
iziToast.error({ title: 'Error', message: 'Invalid response from server. Please
try again.', }); return; } Що перевіряємо?

Чи прийшли дані? Чи є в них фотографії (hits)? Чи це список фотографій
(Array.isArray)? Якщо щось не так → показуємо червоне повідомлення про помилку

javascriptconst photosArr = data.hits; const totalHits = data.totalHits || 0;

if (photosArr.length === 0) { iziToast.error({ title: 'Error', message:
`❌ Sorry, there are no images matching your search query. Please try again!`,
}); return; } Що робимо?

photosArr - список фотографій totalHits - скільки всього є фотографій Якщо
фотографій немає → показуємо повідомлення

javascriptcreateGallery(photosArr); Пояснення:

Створюємо галерею з фотографіями на сторінці

javascriptconst totalPages = Math.ceil(totalHits / perPage); if (currentPage <
totalPages) { showLoadMoreButton(); } else { iziToast.info({ title: 'End of
results', message: "We're sorry, but you've reached the end of search results.",
}); } Що відбувається?

Рахуємо, скільки всього сторінок з фотографіями Якщо є ще сторінки → показуємо
кнопку "Завантажити більше" Якщо це остання сторінка → показуємо синє
повідомлення

javascript} catch (error) { console.error('Error fetching images:', error);
iziToast.error({ title: 'Error', message: 'Something went wrong. Please try
again later.', }); } finally { hideLoader(); formEl.reset(); } Пояснення:

catch - якщо щось пішло не так, ловимо помилку console.error - записуємо помилку
в консоль (для розробників) finally - що робимо в будь-якому випадку: ховаємо
завантаження і очищаємо форму

➕ Функція onLoadMore - завантаження додаткових фото javascriptasync function
onLoadMore() { currentPage += 1; showLoader(); Що робимо?

Переходимо на наступну сторінку (+= 1 означає додати 1) Показуємо анімацію
завантаження

javascriptappendGallery(photosArr); Пояснення:

Додаємо нові фотографії до існуючої галереї (не заміняємо старі!)

javascriptconst galleryItem = document.querySelector('.gallery-item'); if
(galleryItem) { const cardHeight = galleryItem.getBoundingClientRect().height;
window.scrollBy({ top: cardHeight \* 2, behavior: 'smooth', }); } Що це робить?

Знаходимо одну карточку з фотографією Дізнаємося її висоту Прокручуємо сторінку
вниз на 2 висоти карточки (щоб користувач побачив нові фото) behavior:
'smooth' - прокручування буде плавним, а не різким

🎨 Файл: render-functions.js - малює фотографії 📱 Підключення лайтбоксу
javascriptimport SimpleLightbox from 'simplelightbox'; import
'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt',
captionDelay: 250, }); Що це означає?

Підключаємо бібліотеку, яка дозволяє відкривати фото у великому розмірі Коли
користувач натисне на фото → воно відкриється в спеціальному вікні captionsData:
'alt' - показувати підпис фото captionDelay: 250 - чекати 250 мілісекунд перед
показом підпису

🔍 Знаходимо елементи javascriptconst listEl =
document.querySelector('.gallery'); const loaderEl =
document.querySelector('.loader'); const loadMoreBtnEl =
document.querySelector('.load-more-btn'); Пояснення:

Знаходимо контейнер для фотографій Знаходимо елемент анімації завантаження
Знаходимо кнопку "Завантажити більше"

🏗️ Функція renderGallery - створює HTML для фото javascriptfunction
renderGallery(arr) { return arr .map( ({ webformatURL, largeImageURL, tags,
likes, views, comments, downloads, }) => { Що відбувається?

Беремо список фотографій (arr) Для кожної фотографії витягаємо потрібну
інформацію:

webformatURL - маленька версія фото для показу largeImageURL - велика версія для
лайтбоксу tags - опис фото likes, views, comments, downloads - статистика фото

javascriptreturn `<li class="gallery-item">
<a class="gallery-link" href="${largeImageURL}">
<img class="gallery-image" src="${webformatURL}" alt="${tags}" />

<div class="info"> <div class="info-item"> <span class="info-label">Likes</span>
<span class="info-value">${likes}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Views</span>
        <span class="info-value">${views}</span>
</div> <div class="info-item"> <span class="info-label">Comments</span>
<span class="info-value">${comments}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Downloads</span>
        <span class="info-value">${downloads}</span>
</div> </div> </a>

</li>`;
Що це створює?

HTML-код для однієї карточки з фотографією ${...} - вставляємо дані фото в HTML
Кожна карточка містить: фото, лайки, перегляди, коментарі, завантаження

javascript }) .join(''); Пояснення:

.map() створює список HTML-карточок .join('') склеює всі карточки в один великий
HTML-рядок

🎪 Допоміжні функції javascriptexport function createGallery(photosArr) {
listEl.innerHTML = renderGallery(photosArr); gallery.refresh(); } Що робить?

Створює галерею з фотографіями innerHTML - вставляє HTML-код в контейнер
gallery.refresh() - оновлює лайтбокс (каже йому про нові фото)

javascriptexport function appendGallery(photosArr) {
listEl.insertAdjacentHTML('beforeend', renderGallery(photosArr));
gallery.refresh(); } Пояснення:

Додає нові фото до існуючих insertAdjacentHTML('beforeend', ...) - додає в
кінець, не видаляючи старі

javascriptexport function clearGallery() { listEl.innerHTML = ''; } Що робить? -
Очищає галерею (видаляє всі фото) javascriptexport function showLoader() {
loaderEl.classList.remove('is-hidden'); }

export function hideLoader() { loaderEl.classList.add('is-hidden'); } Пояснення:

Показує/ховає анімацію завантаження Додає/видаляє CSS-клас is-hidden

🌐 Файл: pixabay-api.js - йде за фотографіями в інтернет javascriptimport axios
from 'axios'; Що це? - Підключаємо бібліотеку для HTTP-запитів (щоб спілкуватися
з сервером) javascriptexport async function getImagesByQuery(query, page = 1) {
const BASE_URL = 'https://pixabay.com'; const API_KEY =
'52236673-dfbbe0e7dd19cbeb92e7645c8'; const END_POINT = '/api/'; Пояснення:

BASE_URL - адреса сайту Pixabay API_KEY - наш секретний ключ (як пароль для
доступу) END_POINT - конкретний шлях до API

javascriptconst params = { key: API_KEY, q: query, image_type: 'photo',
orientation: 'horizontal', safesearch: 'true', page: page, per_page: 15, }; Що
це за параметри?

key - наш ключ доступу q - що шукаємо image_type: 'photo' - тільки фотографії
(не малюнки) orientation: 'horizontal' - горизонтальні фото safesearch: 'true' -
безпечний пошук page - номер сторінки per_page: 15 - 15 фото на сторінку

javascripttry { const res = await axios.get(`${BASE_URL}${END_POINT}`, { params
}); Що відбувається?

Відправляємо запит на сервер Pixabay await - чекаємо відповіді від сервера res -
отримуємо відповідь

javascriptif (!res.data || typeof res.data !== 'object') { throw new
Error('Invalid response structure'); }

return res.data; Перевіряємо:

Чи є дані у відповіді? Чи це об'єкт з даними? Якщо все ОК → повертаємо дані

javascript} catch (error) { console.error('API Error:', error); throw error; }
Що робимо з помилками?

Записуємо помилку в консоль Передаємо помилку далі (щоб main.js міг її обробити)

🎯 Загальна логіка роботи програми:

Користувач вводить запит і натискає "Пошук" main.js отримує запит і очищає стару
галерею pixabay-api.js йде в інтернет за фотографіями render-functions.js
створює HTML-карточки з фотографіями Користувач бачить фотографії і може
завантажити більше При натисканні "Завантажити більше" процес повторюється для
наступної сторінки

Це як конвеєр: запит → пошук → створення → показ → повторення! 🔄
