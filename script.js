let res = document.getElementById('card__result'),
    searchBtn = document.getElementById('card__btn-search'),
    cityName = document.getElementById('card__city')
// Функция получения данных
const getData = () => {
// Присваиваем переменной значение из input
    let cityVal = cityName.value,
// Вставляем в URL api полученное значение input
        finalUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${key}&units=metric`
// Обрабатываем запрос на сервер
    fetch(finalUrl)
        .then(res => res.json())
        .then(data => {
            res.innerHTML = ''
            getWeather(data)
        })
        .catch(() => {
// Валидация
            res.style.color = 'crimson'
            res.style.fontWeight = '600'
            if (cityVal.length == 0) {
                res.innerHTML = 'Поле не должно быть пустым'
            } else {
                res.innerHTML = 'Введите корректное название города'
            }
        })
}
// Функция отрисовки запрошенного города
const getWeather = data => {
    let $weatherName = document.createElement('h1'),
        $weatherCast = document.createElement('h3'),
        $weatherSubcast = document.createElement('h3'),
        $weatherIco = document.createElement('img'),
        $weatherTemp = document.createElement('h2'),
        $weatherWrapper = document.createElement('div'),
        $weatherWrapperMax = document.createElement('div'),
        $weatherWrapperMin = document.createElement('div'),
        $weatherMaxHeader = document.createElement('h4'),
        $weatherMaxFooter = document.createElement('h4'),
        $weatherMinHeader = document.createElement('h4'),
        $weatherMinFooter = document.createElement('h4')

    $weatherName.classList.add('weather__name')
    $weatherCast.classList.add('weather__cast')
    $weatherSubcast.classList.add('weather__subcast')
    $weatherIco.classList.add('weather__ico')
    $weatherTemp.classList.add('weather__temp')
    $weatherWrapper.classList.add('weather__wrapper')
    $weatherWrapperMax.classList.add('weather__wrapper-max')
    $weatherWrapperMin.classList.add('weather__wrapper-min')
    $weatherMaxHeader.classList.add('weather__wrapper-header')
    $weatherMaxFooter.classList.add('weather__wrapper-footer')
    $weatherMinHeader.classList.add('weather__wrapper-header')
    $weatherMinFooter.classList.add('weather__wrapper-footer')

    $weatherName.textContent = data.name
    $weatherCast.textContent = data.weather[0].main
    $weatherSubcast.textContent = data.weather[0].description
    $weatherIco.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    $weatherTemp.innerHTML = data.main.temp + ' &deg;'
    $weatherMaxHeader.textContent = 'max'
    $weatherMaxFooter.innerHTML = data.main.temp_max + '&deg;'
    $weatherMinHeader.textContent = 'min'
    $weatherMinFooter.innerHTML = data.main.temp_min + '&deg;'

    $weatherWrapperMax.append($weatherMaxHeader, $weatherMaxFooter)
    $weatherWrapperMin.append($weatherMinHeader, $weatherMinFooter)
    $weatherWrapper.append($weatherWrapperMax, $weatherWrapperMin)
    res.append($weatherName, $weatherCast, $weatherSubcast, $weatherIco, $weatherTemp, $weatherWrapper)
}
// Накидываем обработчики событий на кнопку и при нажатии на клавишу Enter
searchBtn.addEventListener('click', getData)
cityName.addEventListener('keydown', e => {
    if (e.key === 'Enter') getData()
})
window.addEventListener('load', getData)