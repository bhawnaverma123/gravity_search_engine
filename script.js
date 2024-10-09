function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.forEach((term, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = term;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.backgroundColor = '#052a58'; 
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '5px';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';

        const uniqueClass = 'delete-btn-' + index;  
        deleteButton.classList.add(uniqueClass);

        listItem.appendChild(deleteButton);

        const style = document.createElement('style');
        style.innerHTML = `
            .${uniqueClass}:hover {
                background-color: white; 
                color: #052a58;
            }
        `;
        document.head.appendChild(style);

        deleteButton.addEventListener('click', () => {
            deleteFromHistory(index);
        });

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
        
        // Add gravity class to dynamically created list items
        listItem.style.position = 'relative';
        listItem.style.opacity = '0';
        listItem.style.top = '-800px';
        listItem.style.animation = 'fall 2s ease-out forwards';
    });
}

function addToHistory(searchTerm) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.push(searchTerm);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateHistory();
}

function deleteFromHistory(index) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateHistory();
}

document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
        addToHistory(searchInput);
        document.getElementById('searchInput').value = ''; 
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    updateHistory();
});

document.addEventListener('DOMContentLoaded', updateHistory);
