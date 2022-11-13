import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
// 1) Импортируем MarvelService
// import MarvelService from './services/MarvelService';
import './style/style.scss';

// 2) Создадим экземпляр класса.
// const marvelService = new MarvelService();
// 3) Возвращается promise then
// Много персонажей
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// Один персонаж
// marvelService.getCharacter(1011052).then(res => console.log(res))


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

