const API_URL = 'https://rickandmortyapi.com/api/character/';
const PAGINATION_PER_PAGE = 5

const LOCAL_STORAGE_KEY = 'personsList';

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const loadMoreButton = document.querySelector('.load-more');

const charactersContainer = document.querySelector('#characters-wrap');

let charactersList = loadList();

searchInput.addEventListener('keypress', onSearchPressEnter);
searchButton.addEventListener('click', onSearchClick);
// loadMoreButton.addEventListener('click', onLoadMoreClick);

init();

/**
 * Search character with ID from input
 * @return {Promise<void>}
 */
async function searchItem() {
    const id = searchInput.value;
    
    if (id === '' || isNaN(id)) {
        alert('Incorrect ID!');
        return;
    }
    
    const characterData = await getDataByID(id);
    
    if (characterData.error) {
        alert(characterData.error);
        return;
    }
    
    charactersList.unshift(characterData);
    saveList(charactersList);
    updateLoadMoreButton();
    
    // update list in DOM
    const characterElement = getElement(characterData);
    charactersContainer.prepend(characterElement);
    
    if (charactersList.length > 5) {
        charactersContainer.children[5].remove();
    }
}

/**
 * Get character by id
 * @param {identifier} - character's id
 * @return {Promise<{image, id, error}>}
 */
async function getDataByID(identifier) {
    const response = await fetch(API_URL + identifier);
    const {id, image, error} = await response.json();
    
    return {id, image, error};
}

function init() {
    for (let i = 0; i < 5; i++) {
        const characterData = charactersList[i];
        const characterElement = getElement(characterData);
        charactersContainer.append(characterElement);
    }
    
    updateLoadMoreButton();
}

function onSearchPressEnter(event) {
    if (event.key === 'Enter') {
        searchItem();
    }
}

function onSearchClick() {
    searchItem();
}

/**
 * get list from localStorage or return empty array
 * @return array
 */
function loadList() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = JSON.parse(saved);
    
    return parsed || [];
}

/**
 * save list to localStorage
 * @param array
 */
function saveList(array) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
}

/**
 * Render HTML Element for character
 * @param id - character's id
 * @param image - character's image src
 * @return {HTMLElement}
 */
function getElement({id, image}) {
    const wrapper = document.createElement('div');
    wrapper.id = `character_${id}`;
    wrapper.classList.add('character');
    
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.classList.add('character__image');
    wrapper.append(imageElement);
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'x';
    removeButton.classList.add('character__remove');
    removeButton.onclick = () => {
        removeCharacter(id);
    };
    wrapper.append(removeButton);
    
    return wrapper;
}

function updateLoadMoreButton() {
    if (charactersList.length > 5) {
        loadMoreButton.removeAttribute('hidden');
    } else {
        loadMoreButton.setAttribute('hidden', 'true');
    }
}

function removeCharacter(id) {
    const index = charactersList.findIndex(characterData => characterData.id === id);
    charactersList.splice(index, 1);
    saveList(charactersList);
    
    charactersContainer.querySelector(`#character_${id}`);
}