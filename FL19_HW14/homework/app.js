const API_URL = 'https://rickandmortyapi.com/api/character/';
const CHARACTERS_PER_PAGE = 5

const LOCAL_STORAGE_KEY = 'personsList';

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const loadMoreButton = document.querySelector('.load-more');

const charactersContainer = document.querySelector('#characters-wrap');

let charactersList = loadList();
let charactersLimit = CHARACTERS_PER_PAGE;

searchInput.addEventListener('keypress', onSearchPressEnter);
searchButton.addEventListener('click', onSearchClick);
loadMoreButton.addEventListener('click', onLoadMoreClick);

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
    
    const {image, error} = await getDataByID(id);
    
    if (error) {
        alert(error);
        return;
    }
    
    const existed = charactersList.find((characterData) => characterData.id === id );
    if (existed !== undefined) {
        alert('Character is already in the list');
        return;
    }
    
    charactersList.unshift({id, image});
    saveList(charactersList);
    renderList(charactersList);
    updateLoadMoreButton();
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
    renderList(charactersList);
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

function onLoadMoreClick() {
    charactersLimit += CHARACTERS_PER_PAGE;
    renderList(charactersList);
    updateLoadMoreButton();
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
 * Re-render characters list
 */
function renderList(array) {
    charactersContainer.innerHTML = '';
    
    for (let i = 0; i < array.length; i++) {
        if (i >= charactersLimit) {
            break;
        }
        
        const {id, image} = array[i];
        const characterElement = getElement(id, image);
        charactersContainer.append(characterElement);
    }
}

/**
 * Render HTML Element for character
 * @param id - character's id
 * @param image - character's image src
 * @return {HTMLElement}
 */
function getElement(id, image) {
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
    if (charactersList.length > charactersContainer.children.length) {
        loadMoreButton.removeAttribute('hidden');
    } else {
        loadMoreButton.setAttribute('hidden', 'true');
    }
}

function removeCharacter(id) {
    if (!confirm('Are you sure?')) {
        return;
    }
    
    const index = charactersList.findIndex(characterData => characterData.id === id);
    charactersList.splice(index, 1);
    saveList(charactersList);
    renderList(charactersList);
    updateLoadMoreButton();
}