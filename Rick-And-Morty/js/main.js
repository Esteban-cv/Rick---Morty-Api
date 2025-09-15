function fillTable(data) {
    let table = "";
    const characters = data.results;

    characters.forEach(character => {
        table += `
        <tr>
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${character.species}</td>
            <td>${character.status}</td>
            <td>
                <button class="btn btn-primary btn-sm btnMoreDetails" data-id="${character.id}">
                    <i class="fas fa-info-circle me-1"></i>Ver Detalles
                </button>
            </td>
        </tr>
        `;
    });

    $("#charactersTable").html(table);

    // 🔹 Corregido: destruir antes de volver a inicializar
    if ($.fn.DataTable.isDataTable('#tablapersonajes')) {
        $('#tablapersonajes').DataTable().destroy();
    }
    $('#tablapersonajes').DataTable();
}

function showCharacterDetails(character) {
    $("#characterImage").attr("src", character.image);
    $("#characterName").text(character.name);
    $("#characterSpecies").text(character.species);
    $("#characterStatus").text(character.status);
    $("#characterGender").text(character.gender);
    $("#characterOrigin").text(character.origin.name);
    $("#characterLocation").text(character.location.name);

    $("#modalpersonaje").modal("show");
}

async function getAllCharacters() {
    let allCharacters = [];
    let nextPage = "https://rickandmortyapi.com/api/character/";

    while (nextPage) {
        try {
            const response = await fetch(nextPage);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextPage = data.info.next;
        } catch (error) {
            console.error("Error fetching characters:", error);
            break;
        }
    }

    return { results: allCharacters };
}

$(document).on("click", "#show", async function () {
    const data = await getAllCharacters();
    fillTable(data);
});

$(document).on('click', '.btnMoreDetails', function () {
    const id = $(this).data('id');

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json())
        .then(character => showCharacterDetails(character))
        .catch(error => console.error("Error en el llamado a la API: ", error));
});
