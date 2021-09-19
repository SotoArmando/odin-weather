import { getResults, initMapGeocoder } from './fetch';
import '../css/main.css';

function Setup() {
  initMapGeocoder();
  document.querySelector("input[placeholder='Type any place']").addEventListener('keyup', () => {
    if (document.querySelector("input[placeholder='Type any place']").checkValidity()) {
      document.querySelector('.search-results').classList.remove('active');
      getResults();
    } else {
      document.querySelector('.search-results').classList.add('active');
    }
  });
}

window.onload = () => {
  Setup();
};
