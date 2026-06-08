let contacts =
JSON.parse(
localStorage.getItem("contacts")
) || [];

let editId = null;

renderContacts();

function addContact(){

    const name =
    document.getElementById("name")
    .value.trim();

    const email =
    document.getElementById("email")
    .value.trim();

    const phone =
    document.getElementById("phone")
    .value.trim();

    if(
        name === "" ||
        email === "" ||
        phone === ""
    ){

        alert(
        "⚠️ Please fill all fields"
        );

        return;
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(
        !emailPattern.test(email)
    ){

        alert(
        "❌ Invalid Email Address"
        );

        return;
    }

    const phonePattern =
    /^[0-9]{10}$/;

    if(
        !phonePattern.test(phone)
    ){

        alert(
        "❌ Phone number must contain 10 digits"
        );

        return;
    }

    if(editId){

        contacts =
        contacts.map(contact =>

            contact.id === editId
            ?

            {
                ...contact,
                name,
                email,
                phone
            }

            :

            contact

        );

        editId = null;

        alert(
        "✅ Contact Updated"
        );

    }

    else{

        contacts.unshift({

            id: Date.now(),

            name,
            email,
            phone

        });

        alert(
        "🎉 Contact Added Successfully"
        );
    }

    saveContacts();

    renderContacts();

    clearForm();
}

function renderContacts(){

    const contactList =
    document.getElementById(
    "contactList"
    );

    const contactCount =
    document.getElementById(
    "contactCount"
    );

    contactCount.innerHTML =

    `📞 Total Contacts: ${contacts.length}`;

    contactList.innerHTML = "";

    if(
        contacts.length === 0
    ){

        contactList.innerHTML =

        `
        <div class="empty-state">

            <h2>
            📒 No Contacts Found
            </h2>

            <p>
            Add your first contact.
            </p>

        </div>
        `;

        return;
    }

    contacts.forEach(contact => {

        contactList.innerHTML +=

        `
        <div class="contact-card">

            <h2>
            👤 ${contact.name}
            </h2>

            <p>
            📧 ${contact.email}
            </p>

            <p>
            📱 ${contact.phone}
            </p>

            <div class="action-buttons">

                <button
                class="edit-btn"
                onclick="editContact(${contact.id})"
                >
                ✏️ Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteContact(${contact.id})"
                >
                🗑 Delete
                </button>

            </div>

        </div>
        `;

    });

}

function deleteContact(id){

    let confirmDelete =

    confirm(
    "Delete this contact?"
    );

    if(
        !confirmDelete
    )
    return;

    contacts =

    contacts.filter(

    contact =>
    contact.id !== id

    );

    saveContacts();

    renderContacts();
}

function editContact(id){

    const contact =

    contacts.find(

    contact =>
    contact.id === id

    );

    document.getElementById(
    "name"
    ).value =
    contact.name;

    document.getElementById(
    "email"
    ).value =
    contact.email;

    document.getElementById(
    "phone"
    ).value =
    contact.phone;

    editId = id;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });
}

function searchContacts(){

    const searchText =

    document
    .getElementById(
    "search"
    )
    .value
    .toLowerCase();

    const contactList =

    document
    .getElementById(
    "contactList"
    );

    const filteredContacts =

    contacts.filter(contact =>

        contact.name
        .toLowerCase()
        .includes(searchText)

        ||

        contact.email
        .toLowerCase()
        .includes(searchText)

        ||

        contact.phone
        .includes(searchText)

    );

    contactList.innerHTML = "";

    if(
        filteredContacts.length === 0
    ){

        contactList.innerHTML =

        `
        <div class="empty-state">

            <h2>
            🔍 No Contact Found
            </h2>

            <p>
            Try another search.
            </p>

        </div>
        `;

        return;
    }

    filteredContacts.forEach(contact => {

        contactList.innerHTML +=

        `
        <div class="contact-card">

            <h2>
            👤 ${contact.name}
            </h2>

            <p>
            📧 ${contact.email}
            </p>

            <p>
            📱 ${contact.phone}
            </p>

            <div class="action-buttons">

                <button
                class="edit-btn"
                onclick="editContact(${contact.id})"
                >
                ✏️ Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteContact(${contact.id})"
                >
                🗑 Delete
                </button>

            </div>

        </div>
        `;
    });

}

function saveContacts(){

    localStorage.setItem(

    "contacts",

    JSON.stringify(
    contacts
    )

    );
}

function clearForm(){

    document.getElementById(
    "name"
    ).value = "";

    document.getElementById(
    "email"
    ).value = "";

    document.getElementById(
    "phone"
    ).value = "";
}