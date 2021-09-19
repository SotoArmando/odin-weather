import { getResults, initMapGeocoder } from './fetch';

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

export default Setup;
