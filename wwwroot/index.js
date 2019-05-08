const PORT = 54665;
// const PORT = 19699;
const HOST = `http://localhost:${PORT}`;
const headers = new Headers({
    'MS-ASPNETCORE-TOKEN': '8554a1c8-0840-49b5-8f23-a4a8c6fbfc76',
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    'Postman-Token': '021d1188-96f2-4181-b5b6-fc48939e1db1',
});
const mode = 'cors';
const credentials = 'include';
const option = {
    headers,
};

let cinemas = [];
let ID = 0;
let genres = [];

document.querySelector('[name="save"]').onclick = async () => {

    const select = document.querySelector('.select');

    const body = {
        nameId: select.options[select.selectedIndex].value,
        genres: genres.map(genre => {
            const input = document.querySelector(`#id_${genre.id}`);
            return {
                id: genre.id,
                value: input.value,
            }
        }),
    }
    try {
        await fetch(`${HOST}/api/gsms/${ID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            method: 'PUT',
        });
        await updateTable();
    } catch (err) {
        alert('error');
    }
};

document.querySelector('[name="add"]').onclick = async () => {
    const input = document.querySelector('#added');
    const select = document.querySelector('.select');

    const body = {
        id: select.options[select.selectedIndex].value,
        value: input.value
    };

    try {
        await fetch(`${HOST}/api/gsms/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            method: 'POST',
        });
        await updateTable();
    } catch (err) {
        alert('error');
    }
}

document.querySelector('[name="delete"]').onclick = async () => {
    const divGenres = document.querySelector('.genres');
    const select = document.querySelector('.select');
    try {
        await fetch(`${HOST}/api/gsms/${select.options[select.selectedIndex].value}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        });
        await updateTable();
    } catch (err) {
        alert('error');
    }
};

async function updateView(id) {
    ID = id;
    const divGenres = document.querySelector('.genres');
    divGenres.innerHTML = '';
    const select = document.querySelector('.select');
    try {
        const result = await fetch(`${HOST}/api/gsms/${id}`);
        const data = await result.json();

        genres = data;
        select.selectedIndex = cinemas.findIndex(cinema => cinema.id === id);

        const fragment = document.createDocumentFragment();
        data.forEach((genre) => {
            const input = document.createElement('input');
            input.name = 'text';
            input.className = 'form-control mb-3';
            input.id = `id_${genre.id}`;
            input.value = genre.description;
            fragment.appendChild(input);
        });
        divGenres.appendChild(fragment);
    } catch (err) {
        alert('error');
    }
}

async function updateTable() {
    const table = document.querySelector('.table');
    const select = document.querySelector('.select');
    const divGenres = document.querySelector('.genres');
    divGenres.innerHTML = '';
    const inputForAdded = document.createElement('input');
    inputForAdded.name = 'text';
    inputForAdded.className = 'form-control mb-3';
    inputForAdded.id = 'added';
    divGenres.appendChild(inputForAdded);

    table.innerHTML = '';
    select.innerHTML = '';
    try {
        const result = await fetch(`${HOST}/api/gsms`);
        const data = await result.json();

        const fragment = document.createDocumentFragment();
        const fragmentOptions = document.createDocumentFragment();
        cinemas = data;
        data.forEach(cinema => {
            const option = document.createElement('option');
            option.innerText = cinema.name;
            option.value = cinema.id;
            fragmentOptions.appendChild(option);

            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const button = document.createElement('button');
            button.innerText = 'View';
            button.className = 'btn btn-info';
            button.onclick = () => updateView(cinema.id);

            td1.innerText = cinema.name;
            td2.appendChild(button);
            tr.appendChild(td1);
            tr.appendChild(td2);
            fragment.appendChild(tr);
        });
        select.appendChild(fragmentOptions);
        table.appendChild(fragment);
    } catch (err) {
        alert("error");
    }
}

updateTable();
