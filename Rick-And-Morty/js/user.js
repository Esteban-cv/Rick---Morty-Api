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
            <td><button class="btn btn-success ">Ver Detalles</button></td>
        </tr>
        `;
    });
    
    $("#usersTable").html(table);
}


$(document).on("click", "#show", function() {
    fetch("https://rickandmortyapi.com/api/character/")
        .then(response => response.json())
        .then(data => fillTable(data))
        .catch(error => console.error("Error fetching characters:", error));
})
