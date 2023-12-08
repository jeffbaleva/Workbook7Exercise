let inputWord = document.querySelector("#inputWord");
let btnSearch = document.querySelector("#btnSearch");

btnSearch.onclick = searchForWord;

async function searchForWord() {
    let wordSearched = inputWord.value;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearched}`;
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        showWord(result);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

let displayWord = document.getElementById('displayWord');


function showWord(result) {
    displayWord.innerHTML = '';

    if (result.length > 0) {
        const firstEntry = result;

        const wordElement = document.createElement('div');
        wordElement.textContent = `Word: ${firstEntry.word}`;
        displayWord.appendChild(wordElement);

        const meaningsElement = document.createElement('div');
        meaningsElement.textContent = 'Meanings:';

        firstEntry.meanings.forEach(meaning => {
            const meaningDiv = document.createElement('div');
            meaningDiv.textContent = `Part of Speech: ${meaning.partOfSpeech}`;

            
            meaning.definitions.forEach((definition, definitionIndex) => {
                const definitionDiv = document.createElement('div');
                definitionDiv.textContent = `   Definition: ${definition.definition}`;

                if (definition.example) {
                    const exampleDiv = document.createElement('div');
                    exampleDiv.textContent = `Example: ${definition.example}`;
                    definitionDiv.appendChild(exampleDiv);
                }

                meaningDiv.appendChild(definitionDiv);
            });

            meaningsElement.appendChild(meaningDiv);
        });

        displayWord.appendChild(meaningsElement);
    }
}